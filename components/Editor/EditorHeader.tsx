import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useAuth } from 'context/AuthContext'

import Link from 'components/Elements/Link'
import Timer from 'components/Stats/Timer'
import Timeline from 'components/Stats/Timeline'
import Streak from 'components/Stats/Streak'
import StatsModal from 'components/Stats/StatsModal'

export default function EditorHeader() {
  return (
    <>
      <div className="editor-header">
        <div className="editor-header-wrapper">
          <Streak />
          <Timeline />
          <Timer />
          <MainMenu />
        </div>
      </div>
      <StatsModal />
    </>
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
        <a href={`/post/create`} className="btn item">
          <FontAwesomeIcon icon={['fas', 'pen-square']} />
          New Post
        </a>
        <a href={`/@${user.username}`} className="btn item">
          <FontAwesomeIcon icon={['fas', 'user']} />
          My Profile
        </a>
        <a href={`/browse`} className="btn item">
          <FontAwesomeIcon icon={['fas', 'users']} />
          Community
        </a>
        {/* <Link href={`/course/novice-to-prolific`} className="btn item">
          <FontAwesomeIcon icon={['fas', 'graduation-cap']} />
          Course
        </Link> */}
        {user.subscriptionStatus === 'FREE' && (
          <a className="btn item" href="/api/payments/create-checkout-session">
            <FontAwesomeIcon icon={['fas', 'arrow-circle-up']} />
            Upgrade ($10/mo)
          </a>
        )}
        <a href="/user/settings" className="btn item">
          <FontAwesomeIcon icon={['fas', 'cog']} />
          Settings
        </a>
        <button className="btn item" onClick={handleLogout}>
          <FontAwesomeIcon icon={['fas', 'sign-out-alt']} />
          Logout
        </button>
      </div>
    </div>
  )
}
