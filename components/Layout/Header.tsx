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
          <a className="btn btn-nav" onClick={() => toggleModal(`login`)}>
            <FontAwesomeIcon icon={['fas', 'sign-in-alt']} />
            Login
          </a>
          {/*  
          <div className="notifications" onClick={() => toggleModal(`login`)}>
            <FontAwesomeIcon icon={['far', 'bell']} />
          </div>
          <DropdownMenu />
          */}
        </nav>
        <div className="clearfix" />
      </div>
    </header>
  )
}

function DropdownMenu() {
  return (
    <div className="dropdown">
      <Link href="/" className="avatar">
        <Image src="/img/avatar.png" width={32} height={32} />
      </Link>
      <div className="menu left">
        <Link className="btn item" href={`/`}>
          <FontAwesomeIcon icon={['fas', 'cog']} />
          Settings
        </Link>
        <Link className="btn item" href={`/`}>
          <FontAwesomeIcon icon={['fas', 'info-circle']} />
          About
        </Link>
        <Link className="btn item" href={`/`}>
          <FontAwesomeIcon icon={['fas', 'sign-out-alt']} />
          Logout
        </Link>
      </div>
    </div>
  )
}
