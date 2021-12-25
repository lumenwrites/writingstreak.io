import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEditorContext } from 'components/Editor/Editor'

export default function TwitterFooter() {
  const { editorValues, setValue } = useEditorContext()
  let url = `writingstreak.io/@${editorValues.username}`
  if (editorValues.canonicalUrl) {
    const domain = new URL(editorValues.canonicalUrl)
    url = domain.hostname
  }
  return (
    <div className="social-image-footer">
      <div className="website">
        <FontAwesomeIcon icon={['fas', 'globe-americas']} />
        {url}
      </div>
      <div className="twitter">
        <FontAwesomeIcon icon={['fab', 'twitter']} />@{editorValues.twitter}
      </div>
    </div>
  )
}
