import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RoundProgressBar from 'components/Elements/RoundProgressBar'

export default function Streak() {
  return (
    <div className="streak">
      <RoundProgressBar progress={85}>
        <div className="in-a-row">12</div>
      </RoundProgressBar>
    </div>
  )
}
