import Cookies from 'js-cookie'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useModal } from 'context/ModalContext'
import { useAuth } from 'context/AuthContext'
import Link from 'components/Elements/Link'

export default function Header({ className }) {
  const { toggleModal } = useModal()
  const { user } = useAuth()

  return (
    <header className={className}>
      <div className="wrapper">
        <Link href="/" className="logo">
          <div className="logo-image">
            <Image src="/logo.png" width={32} height={32} />
          </div>
          <b>writing</b>streak
        </Link>
        <nav>
          {user?.username && (
            <Link href={`/post/create`} className="btn btn-nav">
              Write
            </Link>
          )}
          <Link href={`/browse`} className="btn btn-nav">
            Community
          </Link>
          {user?.username ? (
            <MainMenu />
          ) : (
            <a className="btn btn-nav" onClick={() => toggleModal(`login`)}>
              <FontAwesomeIcon icon={['fas', 'sign-in-alt']} />
              Login
            </a>
          )}
        </nav>
        <div className="clearfix" />
      </div>
    </header>
  )
}

function MainMenu() {
  const { user } = useAuth()
  function handleLogout() {
    Cookies.remove('token', { path: '/'})
    window.location.href = '/'
  }
  return (
    <div className="dropdown">
      <div className="btn btn-nav menu-handle">
        <FontAwesomeIcon icon={['fas', 'bars']} />
      </div>
      <div className="menu left">
        <Link className="btn item" href="/user/settings">
          <FontAwesomeIcon icon={['fas', 'cog']} />
          Settings
        </Link>
        <Link href={`/@${user.username}`} className="btn item">
          <FontAwesomeIcon icon={['fas', 'user']} />
          My Profile
        </Link>
        {/* <Link className="btn item" href={`/`}>
          <FontAwesomeIcon icon={['fas', 'info-circle']} />
          About
        </Link> */}
        <button className="btn item" onClick={handleLogout}>
          <FontAwesomeIcon icon={['fas', 'sign-out-alt']} />
          Logout
        </button>
      </div>
    </div>
  )
}
