#!/usr/bin/env node
// GSC 자동 감시·자가치유 — ilsanroom1
// 매일 실행: 사이트맵 수집 상태 / 4페이지 색인 상태 / "일산룸" 순위를 점검하고
//  - 사이트맵이 미수집·노후(>5일)면 GSC API로 자동 재제출 (자가치유)
//  - 미색인·미크롤 페이지가 있으면 문제로 보고 (exit 1)
//  - 순위/노출/CTR 스냅샷을 출력
// 의존성 없음(Node 18+ 내장 crypto/fetch). 키는 env GSC_SA_KEY(JSON 문자열)로 주입.
import crypto from 'node:crypto';
import fs from 'node:fs';

const SITE = process.env.GSC_SITE || 'https://ilsanroom1.pages.dev/';
const SITEMAP = process.env.GSC_SITEMAP || `${SITE}sitemap.xml`;
const PAGES = (process.env.GSC_PAGES || `${SITE},${SITE}guide,${SITE}review,${SITE}legal`).split(',');
const PRIMARY = process.env.GSC_PRIMARY || '일산룸';
const STALE_DAYS = Number(process.env.GSC_STALE_DAYS || 5);

const raw = process.env.GSC_SA_KEY;
if (!raw) { console.error('SKIP: GSC_SA_KEY env 미설정 — 모니터 건너뜀(비치명적)'); process.exit(0); }
const KEY = JSON.parse(raw);
const b64u = b => Buffer.from(b).toString('base64url');

async function token(scope) {
  const now = Math.floor(Date.now() / 1000);
  const h = b64u(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const c = b64u(JSON.stringify({ iss: KEY.client_email, scope, aud: KEY.token_uri, iat: now, exp: now + 3600 }));
  const sig = crypto.createSign('RSA-SHA256').update(`${h}.${c}`).sign(KEY.private_key).toString('base64url');
  const r = await fetch(KEY.token_uri, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${h}.${c}.${sig}` }) });
  const j = await r.json();
  if (!j.access_token) throw new Error('TOKEN FAIL ' + JSON.stringify(j));
  return j.access_token;
}
const api = (tok, url, opt = {}) => fetch(url, { ...opt, headers: { Authorization: `Bearer ${tok}`, ...(opt.headers || {}) } });
const enc = encodeURIComponent;

async function main() {
  const tok = await token('https://www.googleapis.com/auth/webmasters');
  const problems = [], actions = [], lines = [];
  const log = s => { lines.push(s); console.log(s); };

  log(`# GSC 모니터 — ${SITE}`);
  log(`실행(UTC): ${new Date().toISOString()}`);

  // 1) 사이트맵 수집 상태 + 자가치유
  const sm = await (await api(tok, `https://www.googleapis.com/webmasters/v3/sites/${enc(SITE)}/sitemaps`)).json();
  const entry = (sm.sitemap || []).find(s => s.path === SITEMAP) || (sm.sitemap || [])[0];
  log(`\n## 사이트맵`);
  if (!entry) {
    problems.push('사이트맵이 GSC에 제출되어 있지 않음');
    await api(tok, `https://www.googleapis.com/webmasters/v3/sites/${enc(SITE)}/sitemaps/${enc(SITEMAP)}`, { method: 'PUT' });
    actions.push(`사이트맵 신규 제출: ${SITEMAP}`);
  } else {
    const dl = entry.lastDownloaded ? new Date(entry.lastDownloaded) : null;
    const ageDays = dl ? (Date.now() - dl.getTime()) / 864e5 : Infinity;
    log(`  ${entry.path} | downloaded=${entry.lastDownloaded || 'NEVER'} | errors=${entry.errors || 0} | pending=${entry.isPending || false}`);
    if (!dl || ageDays > STALE_DAYS) {
      problems.push(`사이트맵 미수집/노후(${dl ? ageDays.toFixed(1) + '일' : 'NEVER'}) — 재제출`);
      await api(tok, `https://www.googleapis.com/webmasters/v3/sites/${enc(SITE)}/sitemaps/${enc(SITEMAP)}`, { method: 'PUT' });
      actions.push(`사이트맵 재제출(강제 재수집): ${SITEMAP}`);
    }
    if (Number(entry.errors) > 0) problems.push(`사이트맵 오류 ${entry.errors}건`);
  }

  // 2) 페이지 색인 상태
  log(`\n## 색인 상태`);
  for (const u of PAGES) {
    const r = await (await api(tok, 'https://searchconsole.googleapis.com/v1/urlInspection/index:inspect',
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ inspectionUrl: u, siteUrl: SITE }) })).json();
    const ir = r.inspectionResult?.indexStatusResult;
    if (!ir) { problems.push(`${u} 검사 실패`); log(`  ${u} → 검사 실패`); continue; }
    const ok = ir.verdict === 'PASS';
    log(`  ${ok ? '✅' : '⚠️'} ${u} | ${ir.coverageState} | crawl=${ir.lastCrawlTime || 'NEVER'}`);
    if (!ok) problems.push(`미색인: ${u} (${ir.coverageState})`);
  }

  // 3) 순위/노출 스냅샷 (90일)
  log(`\n## "${PRIMARY}" 순위 스냅샷 (90일)`);
  const end = new Date().toISOString().slice(0, 10);
  const start = new Date(Date.now() - 90 * 864e5).toISOString().slice(0, 10);
  const qr = await (await api(tok, `https://www.googleapis.com/webmasters/v3/sites/${enc(SITE)}/searchAnalytics/query`,
    { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ startDate: start, endDate: end, dimensions: ['query'], rowLimit: 25 }) })).json();
  const rows = qr.rows || [];
  for (const r of rows.slice(0, 15)) log(`  ${(r.position).toFixed(1).padStart(5)}위 imp=${r.impressions} clk=${r.clicks} ctr=${(r.ctr * 100).toFixed(1)}% "${r.keys[0]}"`);
  if (!rows.length) log('  (노출 데이터 없음)');

  log(`\n## 요약`);
  log(actions.length ? `자가치유 ${actions.length}건: ${actions.join(' / ')}` : '자가치유 동작 없음');
  log(problems.length ? `문제 ${problems.length}건:\n- ${problems.join('\n- ')}` : '문제 0건 — 정상');

  fs.writeFileSync('/tmp/gsc-monitor-report.md', lines.join('\n'));
  // 자가치유로 해결한 사이트맵 재제출은 "조치 완료"이므로, 미색인 등 미해결 문제만 알림 트리거
  const unresolved = problems.filter(p => !p.includes('재제출') && !p.includes('제출'));
  process.exit(unresolved.length ? 1 : 0);
}
main().catch(e => { console.error('ERR', e.message); process.exit(2); });
