import { useState, useEffect } from 'react'

function getNextWeekend() {
  const now = new Date()
  const day = now.getDay()
  const daysUntilFri = day <= 5 ? 5 - day : 6
  const fri = new Date(now)
  fri.setDate(now.getDate() + daysUntilFri)
  fri.setHours(19, 0, 0, 0)
  if (fri <= now) {
    fri.setDate(fri.getDate() + 7)
  }
  return fri
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(null)
  const [spots, setSpots] = useState(null)

  useEffect(() => {
    const saved = sessionStorage.getItem('countdown_spots')
    const s = saved ? parseInt(saved, 10) : Math.floor(Math.random() * 5) + 3
    if (!saved) sessionStorage.setItem('countdown_spots', String(s))
    setSpots(s)

    const target = getNextWeekend()

    const tick = () => {
      const diff = target - new Date()
      if (diff <= 0) {
        setTimeLeft(null)
        return
      }
      const h = Math.floor(diff / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const sec = Math.floor((diff % 60000) / 1000)
      setTimeLeft(`${h}시간 ${m}분 ${sec}초`)
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  if (!timeLeft || spots === null) return null

  return (
    <div className="countdown-bar">
      <span className="countdown-pulse" />
      <span className="countdown-text">
        이번 주말 예약 마감까지 <strong>{timeLeft}</strong> — 남은 자리 <strong>{spots}석</strong>
      </span>
    </div>
  )
}
