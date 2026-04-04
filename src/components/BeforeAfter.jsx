export default function BeforeAfter({ before, after }) {
  return (
    <div className="before-after">
      <div className="ba-col ba-before">
        <div className="ba-label">BEFORE</div>
        <p>{before}</p>
      </div>
      <div className="ba-divider">
        <span>&rarr;</span>
      </div>
      <div className="ba-col ba-after">
        <div className="ba-label">AFTER</div>
        <p>{after}</p>
      </div>
    </div>
  )
}
