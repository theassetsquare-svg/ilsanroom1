import { useState, useEffect, useRef } from 'react'

const MAIN_SITE = 'https://ilsanroom.pages.dev/'

export default function ExitIntent() {
  const [show, setShow] = useState(false)
  const lastY = useRef(0)
  const dismissed = useRef(false)

  useEffect(() => {
    if (sessionStorage.getItem('exitIntentDismissed')) {
      dismissed.current = true
      return
    }

    const handleScroll = () => {
      if (dismissed.current) return
      const y = window.scrollY
      const scrollPercent = y / (document.body.scrollHeight - window.innerHeight)
      if (scrollPercent > 0.15 && y < lastY.current - 80) {
        setShow(true)
      }
      lastY.current = y
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const dismiss = () => {
    setShow(false)
    dismissed.current = true
    sessionStorage.setItem('exitIntentDismissed', 'true')
  }

  if (!show) return null

  return (
    <div className="exit-overlay" onClick={dismiss}>
      <div className="exit-modal" onClick={(e) => e.stopPropagation()}>
        <button className="exit-close" onClick={dismiss} aria-label="닫기">&times;</button>
        <p className="exit-hook">잠깐! 이것만 보고 가세요</p>
        <p className="exit-sub">일산룸 예약 전 꼭 확인해야 할 체크리스트를 놓치고 있습니다.</p>
        <a href={MAIN_SITE} target="_blank" rel="noopener noreferrer" className="cta-button" onClick={dismiss}>
          놀쿨에서 더 많은 곳 보기 &rarr;
        </a>
      </div>
    </div>
  )
}
