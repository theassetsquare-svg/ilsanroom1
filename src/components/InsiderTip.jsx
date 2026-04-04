export default function InsiderTip({ children }) {
  return (
    <div className="insider-tip">
      <div className="insider-tip-badge">TIP</div>
      <div className="insider-tip-content">{children}</div>
    </div>
  )
}
