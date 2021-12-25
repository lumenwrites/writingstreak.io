import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RoundProgressBar from 'components/Elements/RoundProgressBar'
import { useEditorContext } from 'components/Editor/Editor'
import { calculateStreak, calculateHabitStrength } from './utils'
import { generateStats, loadTodayIntoSavedDays } from './utils'
import { useModal } from 'context/ModalContext'
import moment from 'moment'


export default function Streak() {
  const { toggleModal } = useModal()
  const { editorValues, setValue } = useEditorContext()
  const streak = calculateStreak(editorValues.days, editorValues.writingDays)
  const { habitStrength, completedDays } = calculateHabitStrength(editorValues.days, editorValues.writingDays)
  const { startDate, endDate, writingGoal, writingDays } = editorValues
  const daysWithTodaysStats = loadTodayIntoSavedDays(editorValues)
  const stats = generateStats(daysWithTodaysStats, { startDate, endDate, writingGoal, writingDays })
  const goalProgressDescription = `You wrote ${stats.totalWordsWritten} out of ${stats.writingGoal} words towards your long-term goal.`
  const progress = Math.min((stats.totalWordsWritten / stats.writingGoal) * 100, 100)
  return (
    <button
      className="streak"
      data-multiline={true}
      data-place="right"
      data-tip={
        `You've reached your daily writing goal for ${streak} days in a row. <br/>` + `${goalProgressDescription}`
      }
      onClick={() => toggleModal('stats')}
    >
      <RoundProgressBar progress={progress}>
        <div className="in-a-row">{streak}</div>
      </RoundProgressBar>
    </button>
  )
}
