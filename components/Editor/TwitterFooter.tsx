import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEditorContext } from 'components/Editor/Editor'

export default function TwitterFooter() {
  const { editorValues, setValue } = useEditorContext()
  return (
    <div className="social-image-footer">
      <div className="website">
        <FontAwesomeIcon icon={['fas', 'globe-americas']} />
        prolificacademy.io/@{editorValues.username}
      </div>
      <div className="twitter">
        <FontAwesomeIcon icon={['fab', 'twitter']} />
        @{editorValues.twitter}
      </div>
    </div>
  )
}
