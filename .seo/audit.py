#!/usr/bin/env python3
"""SEO 정밀 감사 — 4페이지 키워드 밀도/중복/스터핑 분석"""
import re, sys, json, os, glob, html

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGES = ['index.html', 'guide.html', 'review.html', 'legal.html']
PRIMARY = '일산룸'

def strip_html(s):
    s = re.sub(r'<script\b[^>]*>.*?</script>', '', s, flags=re.S|re.I)
    s = re.sub(r'<style\b[^>]*>.*?</style>', '', s, flags=re.S|re.I)
    s = re.sub(r'<[^>]+>', ' ', s)
    return html.unescape(re.sub(r'\s+', ' ', s)).strip()

def korean_chars(s):
    return len(re.findall(r'[가-힣]', s))

def find_tag(html_s, tag):
    m = re.search(rf'<{tag}\b[^>]*>(.*?)</{tag}>', html_s, re.S|re.I)
    return m.group(1).strip() if m else ''

def find_meta(html_s, name, attr='name'):
    m = re.search(rf'<meta\s+[^>]*{attr}=["\']{name}["\'][^>]*content=["\']([^"\']+)["\']', html_s, re.I)
    if m: return m.group(1)
    m = re.search(rf'<meta\s+[^>]*content=["\']([^"\']+)["\'][^>]*{attr}=["\']{name}["\']', html_s, re.I)
    return m.group(1) if m else ''

def find_h1s(html_s):
    return [strip_html(x) for x in re.findall(r'<h1\b[^>]*>(.*?)</h1>', html_s, re.S|re.I)]

def duplicate_words(s):
    """단어가 2회 이상 등장하는지 체크 (제목용)"""
    s = re.sub(r'[—·,.\-:|·()]', ' ', s)
    words = [w for w in s.split() if w]
    seen = {}
    dups = []
    for w in words:
        seen[w] = seen.get(w, 0) + 1
        if seen[w] == 2:
            dups.append(w)
    return dups

def analyze(path):
    with open(path, encoding='utf-8') as f:
        h = f.read()
    title = strip_html(find_tag(h, 'title'))
    desc = find_meta(h, 'description')
    og_t = find_meta(h, 'og:title', 'property')
    og_d = find_meta(h, 'og:description', 'property')
    tw_t = find_meta(h, 'twitter:title')
    tw_d = find_meta(h, 'twitter:description')
    h1s = find_h1s(h)

    body_match = re.search(r'<body\b[^>]*>(.*?)</body>', h, re.S|re.I)
    body = body_match.group(1) if body_match else h
    text = strip_html(body)
    total_chars = korean_chars(text)
    kw_count = text.count(PRIMARY)
    density = (kw_count * len(PRIMARY) / total_chars * 100) if total_chars else 0

    return {
        'file': os.path.basename(path),
        'title': title, 'title_len': len(title),
        'title_dup_words': duplicate_words(title),
        'desc': desc, 'desc_len': len(desc),
        'desc_dup_words': duplicate_words(desc),
        'og_title': og_t, 'og_desc': og_d,
        'tw_title': tw_t, 'tw_desc': tw_d,
        'h1s': h1s, 'h1_count': len(h1s),
        'total_kor_chars': total_chars,
        'kw_count': kw_count,
        'density_pct': round(density, 2),
        'density_ok': 1.5 <= density <= 2.5,
    }

def main():
    results = []
    titles = []
    descs = []
    for p in PAGES:
        full = os.path.join(ROOT, p)
        if not os.path.exists(full):
            continue
        r = analyze(full)
        results.append(r)
        titles.append((r['file'], r['title']))
        descs.append((r['file'], r['desc']))

    issues = []
    # cross-page title uniqueness
    seen_t = {}
    for f, t in titles:
        if t in seen_t:
            issues.append(f"DUPLICATE TITLE: {f} ↔ {seen_t[t]}: {t}")
        seen_t[t] = f
    seen_d = {}
    for f, d in descs:
        if d in seen_d:
            issues.append(f"DUPLICATE DESC: {f} ↔ {seen_d[d]}")
        seen_d[d] = f

    for r in results:
        if r['title_dup_words']:
            issues.append(f"{r['file']} TITLE has duplicate words: {r['title_dup_words']}")
        if r['desc_dup_words']:
            issues.append(f"{r['file']} DESC has duplicate words: {r['desc_dup_words']}")
        if r['title_len'] > 60:
            issues.append(f"{r['file']} TITLE too long: {r['title_len']} chars")
        if r['desc_len'] > 160 or r['desc_len'] < 110:
            issues.append(f"{r['file']} DESC len {r['desc_len']} out of 110-160")
        if not r['density_ok']:
            issues.append(f"{r['file']} keyword density {r['density_pct']}% out of 1.5-2.5%")
        if r['h1_count'] != 1:
            issues.append(f"{r['file']} has {r['h1_count']} H1 tags (need exactly 1)")

    out = {'pages': results, 'issues': issues}
    print(json.dumps(out, ensure_ascii=False, indent=2))
    return 1 if issues else 0

if __name__ == '__main__':
    sys.exit(main())
