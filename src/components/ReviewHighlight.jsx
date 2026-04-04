export default function ReviewHighlight({ name, rating, text, date }) {
  return (
    <div className="review-highlight">
      <div className="review-top">
        <span className="review-stars">{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</span>
        <span className="review-date">{date}</span>
      </div>
      <p className="review-text">"{text}"</p>
      <span className="review-name">— {name}</span>
    </div>
  )
}
