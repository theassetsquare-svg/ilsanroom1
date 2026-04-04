import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const pages = [
  { path: '/', title: '일산룸 — 예약 전에 반드시 읽어야 할 글', keywords: '일산룸 예약 가격 지역 라페스타 웨스턴돔 장항동 분위기 정보' },
  { path: '/guide', title: '일산룸 초보자 완벽 가이드', keywords: '초보 가이드 복장 매너 예약 방법 입장 결제 팁 처음' },
  { path: '/review', title: '일산룸 지역별 솔직 후기', keywords: '후기 리뷰 비교 라페스타 웨스턴돔 장항동 분위기 서비스 접근성' },
  { path: '/price', title: '일산룸 가격 비교 총정리', keywords: '가격 비용 세팅비 양주 연장 요금 가성비 할인 결제 영수증' },
]

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const navigate = useNavigate()

  const results = query.trim().length > 0
    ? pages.filter(p => p.title.includes(query) || p.keywords.includes(query))
    : []

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const go = (path) => {
    setQuery('')
    setOpen(false)
    navigate(path)
  }

  return (
    <div className="search-bar" ref={ref}>
      <input
        type="search"
        placeholder="일산룸 정보 검색..."
        value={query}
        onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)}
        aria-label="사이트 내 검색"
      />
      {open && results.length > 0 && (
        <ul className="search-results">
          {results.map(r => (
            <li key={r.path}>
              <button onClick={() => go(r.path)}>{r.title}</button>
            </li>
          ))}
        </ul>
      )}
      {open && query.trim().length > 0 && results.length === 0 && (
        <ul className="search-results">
          <li className="search-empty">검색 결과가 없습니다</li>
        </ul>
      )}
    </div>
  )
}
