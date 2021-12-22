import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useAuth } from 'context/AuthContext'

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
        <MainMenu />
      </div>
    </div>
  )
}

function MainMenu() {
  const { user } = useAuth()
  function handleLogout() {
    Cookies.remove('token', { path: '/' })
    window.location.href = '/'
  }
  return (
    <div className="dropdown main-menu">
      <button className="btn menu-handle">
        <FontAwesomeIcon icon={['fas', 'bars']} />
      </button>
      <div className="menu left">
        <Link href={`/@${user.username}`} className="btn item">
          <FontAwesomeIcon icon={['fas', 'user']} />
          My Profile
        </Link>
        <Link href={`/browse`} className="btn item">
          <FontAwesomeIcon icon={['fas', 'users']} />
          Community
        </Link>
        {/* <Link href={`/course/novice-to-prolific`} className="btn item">
          <FontAwesomeIcon icon={['fas', 'graduation-cap']} />
          Course
        </Link> */}
        <a className="btn item" href="/api/payments/create-checkout-session">
          <FontAwesomeIcon icon={['fas', 'arrow-circle-up']} />
          Upgrade ($20/mo)
        </a>
        <Link href="/user/settings" className="btn item">
          <FontAwesomeIcon icon={['fas', 'cog']} />
          Settings
        </Link>
        <button className="btn item" onClick={handleLogout}>
          <FontAwesomeIcon icon={['fas', 'sign-out-alt']} />
          Logout
        </button>
      </div>
    </div>
  )
}
