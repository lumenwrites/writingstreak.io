export default function MessagePanel({ type, message }) {
  if (!message) return null
  return (
    <div className={`message-panel ${type==='success' ? 'success' : 'error'}`}>
      {message}
    </div>
  )
}
