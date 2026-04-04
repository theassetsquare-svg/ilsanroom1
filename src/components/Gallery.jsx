import { useState, useRef, useEffect } from 'react'

const slides = [
  {
    day: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80&auto=format',
    night: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&q=80&auto=format',
    caption: '라페스타 거리 — 낮에는 평범한 상가, 밤에는 일산 최고의 번화가로 변한다',
  },
  {
    day: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80&auto=format',
    night: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&q=80&auto=format',
    caption: '웨스턴돔 업소 — 일반 사무 공간과 프리미엄 라운지, 같은 건물 다른 세계',
  },
  {
    day: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80&auto=format',
    night: 'https://images.unsplash.com/photo-1519690889869-e705e59f72e1?w=600&q=80&auto=format',
    caption: '장항동 인근 — 한적한 동네 카페 골목이 밤에는 숨겨진 프라이빗 명소가 된다',
  },
  {
    day: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80&auto=format',
    night: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&q=80&auto=format',
    caption: '기본 세팅 — 점심엔 레스토랑, 저녁엔 분위기 있는 바로 완전히 달라진다',
  },
  {
    day: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80&auto=format',
    night: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80&auto=format',
    caption: '룸 조명 — 낮 자연광과 밤 무드등, 같은 공간이 완전히 다른 경험을 만든다',
  },
  {
    day: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&q=80&auto=format',
    night: 'https://images.unsplash.com/photo-1560624052-449f5ddf0c31?w=600&q=80&auto=format',
    caption: '음료 세팅 — 낮 커피 한 잔 가격이면 밤에는 프리미엄 세팅을 받을 수 있다',
  },
]

export default function Gallery() {
  const [index, setIndex] = useState(0)
  const [mode, setMode] = useState('night')
  const trackRef = useRef(null)
  const startX = useRef(0)

  const go = (dir) => {
    setIndex((prev) => {
      if (dir === 1) return prev < slides.length - 1 ? prev + 1 : 0
      return prev > 0 ? prev - 1 : slides.length - 1
    })
  }

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    let touching = false

    const onStart = (e) => {
      touching = true
      startX.current = e.touches[0].clientX
    }
    const onEnd = (e) => {
      if (!touching) return
      touching = false
      const diff = startX.current - e.changedTouches[0].clientX
      if (Math.abs(diff) > 50) go(diff > 0 ? 1 : -1)
    }

    el.addEventListener('touchstart', onStart, { passive: true })
    el.addEventListener('touchend', onEnd, { passive: true })
    return () => {
      el.removeEventListener('touchstart', onStart)
      el.removeEventListener('touchend', onEnd)
    }
  })

  const slide = slides[index]

  return (
    <div className="gallery">
      <div className="gallery-header">
        <span className="gallery-badge">GALLERY</span>
        <span className="gallery-title">낮 vs 밤 — 같은 장소, 다른 세계</span>
      </div>

      <div className="gallery-toggle">
        <button className={mode === 'day' ? 'active' : ''} onClick={() => setMode('day')}>낮</button>
        <button className={mode === 'night' ? 'active' : ''} onClick={() => setMode('night')}>밤</button>
      </div>

      <div className="gallery-viewport" ref={trackRef}>
        <img
          src={mode === 'day' ? slide.day : slide.night}
          alt={slide.caption}
          loading="lazy"
          decoding="async"
        />
        <div className="gallery-label">{mode === 'day' ? '낮' : '밤'}</div>
      </div>

      <p className="gallery-caption">{slide.caption}</p>

      <div className="gallery-controls">
        <button className="gallery-arrow" onClick={() => go(-1)} aria-label="이전">&larr;</button>
        <div className="gallery-dots">
          {slides.map((_, i) => (
            <span key={i} className={`gallery-dot ${i === index ? 'active' : ''}`} onClick={() => setIndex(i)} />
          ))}
        </div>
        <button className="gallery-arrow" onClick={() => go(1)} aria-label="다음">&rarr;</button>
      </div>
    </div>
  )
}
