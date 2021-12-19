import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RoundProgressBar from 'components/Elements/RoundProgressBar'
import { useEditorContext } from 'components/Editor/Editor'

export default function Streak() {
  const { editorValues, setValue } = useEditorContext()
  // console.log('habit strength', editorInfo.habitStrength)
  return (
    <div className="streak">
      <RoundProgressBar progress={editorValues.habitStrength * 100}>
        <div className="in-a-row">{editorValues.streak}</div>
      </RoundProgressBar>
    </div>
  )
}
