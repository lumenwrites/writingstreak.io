import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function TwitterFooter() {
  return (
    <div className="twitter-footer">
      <div className="website">
        <FontAwesomeIcon icon={['fas', 'globe-americas']} />
        lumenwrites.io
        {/* nexy.io/@lumen */}
      </div>
      <div className="twitter">
        <FontAwesomeIcon icon={['fab', 'twitter']} />
        @lumenwrites
      </div>
    </div>
  )
}
