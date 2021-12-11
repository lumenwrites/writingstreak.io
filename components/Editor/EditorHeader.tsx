import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Link from 'components/Elements/Link'
import Timer from 'components/Stats/Timer'
import Timeline from 'components/Stats/Timeline'
import Streak from 'components/Stats/Streak'


export default function EditorHeader() {
  return (
    <div className="editor-header">
      <div className="editor-header-wrapper">
        <Streak />
        <Timeline />
        <Timer />
        <MainMenu/>
      </div>
    </div>
  )
}

function MainMenu() {
  return (
    <div className="dropdown main-menu">
      <button className="btn menu-handle">
        <FontAwesomeIcon icon={['fas', 'bars']} />
      </button>
      <div className="menu">
        <Link href={`/@lumen`} className="btn item">
          <FontAwesomeIcon icon={['fas', 'user']} />
          My Profile
        </Link>
        <button className="btn item" onClick={() => {}}>
          <FontAwesomeIcon icon={['fas', 'arrow-circle-up']} />
          Upgrade ($15)
        </button>
        <button className="btn item" onClick={() => {}}>
          <FontAwesomeIcon icon={['fas', 'cog']} />
          Settings
        </button>
      </div>
    </div>
  )
}
