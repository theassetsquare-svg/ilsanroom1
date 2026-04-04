import { useState, useEffect } from 'react'

const MAIN_SITE = 'https://nolcool.com'

export default function ScrollCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      setVisible(scrollPercent > 0.35 && scrollPercent < 0.65)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!visible) return null

  return (
    <div className="scroll-cta">
      <a href={MAIN_SITE} target="_blank" rel="noopener noreferrer" className="cta-button">
        놀쿨에서 일산룸 더 보기 &rarr;
      </a>
    </div>
  )
}
