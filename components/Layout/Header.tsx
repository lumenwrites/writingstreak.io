import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useModal } from 'context/ModalContext'
import Link from 'components/Elements/Link'

export default function Header({ className }) {
  const { toggleModal } = useModal()
  return (
    <header className={className}>
      <div className="wrapper">
        <Link href="/" className="logo">
          <div className="logo-image">
            <Image src="/logo.png" width={32} height={32} />
          </div>
          nexy
        </Link>
        <nav>
                    {/* <a className="btn btn-nav btn-cta" onClick={() => toggleModal(`login`)}>
            <FontAwesomeIcon icon={['fas', 'sign-in-alt']} />
            Login
          </a> */}
          {/*  
          <Link href={`/post/create`} className="btn btn-nav">
            Create Post
          </Link>
          <div className="notifications" onClick={() => toggleModal(`login`)}>
            <FontAwesomeIcon icon={['far', 'bell']} />
          </div>
          <DropdownMenu />
          */}
        </nav>
        {/* <nav> */}
        {/* <Link href={`/about`} className="btn btn-nav">
            <FontAwesomeIcon icon={['fas', 'info-circle']} />
            About
          </Link>
          <a className="btn btn-nav btn-cta" onClick={() => toggleModal(`subscribe`)}>
            Subscribe
          </a> */}
        {/*  */}
        {/* </nav> */}
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
