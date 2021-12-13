import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RoundProgressBar from 'components/Elements/RoundProgressBar'
import { useEditorInfo } from 'context/EditorContext'

export default function Streak() {
  const { editorInfo, setEditorInfo } = useEditorInfo()
  // console.log('habit strength', editorInfo.habitStrength)
  return (
    <div className="streak">
      <RoundProgressBar progress={editorInfo.habitStrength * 100}>
        <div className="in-a-row">{editorInfo.streak}</div>
      </RoundProgressBar>
    </div>
  )
}
