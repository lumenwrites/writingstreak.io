import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export default function RoundProgressBar({ progress, children, onClick }) {
  return (
    <div className="round-progress-bar-wrapper" onClick={onClick}>
      <CircularProgressbar value={progress} />
      <div className="inside-progress-bar">{children}</div>
    </div>
  )
}
