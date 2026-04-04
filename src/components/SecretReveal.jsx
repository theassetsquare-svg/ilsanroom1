import { useState, useEffect } from 'react'

export default function SecretReveal({ children, title }) {
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const saved = sessionStorage.getItem('secretRevealed')
    if (saved) {
      setRevealed(true)
      return
    }

    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      if (scrollPercent > 0.78) {
        setRevealed(true)
        sessionStorage.setItem('secretRevealed', 'true')
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`secret-reveal ${revealed ? 'revealed' : ''}`}>
      <div className="secret-header">
        <span className="secret-badge">INSIDER</span>
        <span className="secret-title">{title}</span>
      </div>
      <div className="secret-body">
        {revealed ? children : (
          <div className="secret-locked">
            <p>이 정보를 보려면 글을 끝까지 읽어주세요</p>
            <div className="secret-blur">현지인만 아는 정보가 여기에 숨겨져 있습니다. 스크롤을 계속하면 잠금이 해제됩니다.</div>
          </div>
        )}
      </div>
    </div>
  )
}
