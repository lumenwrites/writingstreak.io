import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RoundProgressBar from 'components/Elements/RoundProgressBar'
import { useEditorContext } from 'components/Editor/Editor'
import { calculateStreak, calculateHabitStrength } from './utils'

export default function Streak() {
  const { editorValues, setValue } = useEditorContext()
  const streak = calculateStreak(editorValues.days, editorValues.writingDays)
  const { habitStrength, completedDays } = calculateHabitStrength(editorValues.days, editorValues.writingDays)
  return (
    <div
      className="streak"
      data-multiline={true}
      data-place="right"
      data-tip={
        `You've reached your daily writing goal <br/>` +
        `for ${streak} days in a row, ` +
        `${completedDays} out of last 30 days.<br/>`
      }
    >
      <RoundProgressBar progress={habitStrength * 100}>
        <div className="in-a-row">{streak}</div>
      </RoundProgressBar>
    </div>
  )
}
