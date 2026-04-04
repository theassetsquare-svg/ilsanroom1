import { useState } from 'react'

const questions = [
  {
    q: '모임의 주요 목적은?',
    options: [
      { text: '친구들과 가볍게 한잔', type: 'casual' },
      { text: '거래처 접대나 중요 모임', type: 'premium' },
      { text: '조용히 프라이빗하게', type: 'private' },
    ],
  },
  {
    q: '선호하는 분위기는?',
    options: [
      { text: '활기차고 북적이는 곳', type: 'casual' },
      { text: '세련되고 고급스러운 곳', type: 'premium' },
      { text: '아는 사람만 아는 숨은 곳', type: 'private' },
    ],
  },
  {
    q: '예산은 어느 정도?',
    options: [
      { text: '2인 기준 20만 원 이하', type: 'casual' },
      { text: '2인 기준 20~35만 원', type: 'premium' },
      { text: '가격보다 만족도가 우선', type: 'private' },
    ],
  },
]

const results = {
  casual: {
    title: '라페스타 캐주얼파',
    desc: '가성비 좋고 접근성 최고인 라페스타가 딱 맞는다. 처음 가는 사람에게도 부담 없고, 2차 연계도 쉬워서 밤새 즐길 수 있다.',
    area: '라페스타',
  },
  premium: {
    title: '웨스턴돔 프리미엄파',
    desc: '격이 다른 인테리어와 세심한 서비스를 원한다면 웨스턴돔이다. 접대 성공률이 높고, 한 번 가면 다시 찾게 되는 곳.',
    area: '웨스턴돔',
  },
  private: {
    title: '장항동 프라이빗파',
    desc: '남의 눈 신경 쓰지 않고 내 취향대로 즐기고 싶다면 장항동이다. 단골이 되면 맞춤 서비스의 진가를 경험하게 된다.',
    area: '장항동',
  },
}

export default function MiniQuiz() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState(null)

  const handleAnswer = (type) => {
    const next = [...answers, type]
    setAnswers(next)

    if (next.length === questions.length) {
      const counts = {}
      next.forEach((t) => {
        counts[t] = (counts[t] || 0) + 1
      })
      const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]
      setResult(results[winner])
    } else {
      setStep(step + 1)
    }
  }

  const reset = () => {
    setStep(0)
    setAnswers([])
    setResult(null)
  }

  return (
    <div className="mini-quiz">
      <div className="quiz-header">
        <span className="quiz-badge">QUIZ</span>
        <span className="quiz-title">당신에게 맞는 일산룸 유형은?</span>
      </div>

      {!result ? (
        <div className="quiz-body">
          <div className="quiz-progress">
            {questions.map((_, i) => (
              <div key={i} className={`quiz-dot ${i < step ? 'done' : ''} ${i === step ? 'current' : ''}`} />
            ))}
          </div>
          <p className="quiz-question">Q{step + 1}. {questions[step].q}</p>
          <div className="quiz-options">
            {questions[step].options.map((opt) => (
              <button key={opt.text} className="quiz-option" onClick={() => handleAnswer(opt.type)}>
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="quiz-result">
          <div className="quiz-result-tag">{result.area} 추천</div>
          <h4 className="quiz-result-title">{result.title}</h4>
          <p className="quiz-result-desc">{result.desc}</p>
          <button className="quiz-retry" onClick={reset}>다시 해보기</button>
        </div>
      )}
    </div>
  )
}
