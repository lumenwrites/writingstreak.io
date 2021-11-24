import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useModal } from 'context/ModalContext'
import Link from 'components/Elements/Link'
import { ToggleSidebarButton } from './Sidebar'

export default function Header({ className }) {
  const { toggleModal } = useModal()
  return (
    <header className={className}>
      <div className="wrapper">
        <ToggleSidebarButton />
        <Link href="/" className="logo">
          <div className="logo-image">
            <Image src="/logo.png" width={32} height={32} />
          </div>
          nexy
        </Link>
        <nav>
          {/* <Link href={`/`} className="btn btn-nav">
            Browse
          </Link> */}
          {/* <Link href={`/post/create`} className="btn btn-nav">
            Create Post
          </Link> */}
          {/* <Link href={`/post/create`} className="btn btn-nav">
            <Image src="/img/avatar.png" width={32} height={32} />
          </Link> */}
          {/* <a className="btn btn-nav btn-cta" onClick={() => toggleModal(`login`)}>
            <FontAwesomeIcon icon={['fas', 'sign-in-alt']} />
            Login
          </a> */}
          <Link href={`/projects`} className="btn btn-nav">
            My Projects
          </Link>
          <Link href={`/about`} className="btn btn-nav">
            About
          </Link>
          {/* <DropdownMenu /> */}
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
    <div className="dropdown sorting">
      <Link href="/" className="menu-handle btn btn-nav">
        <FontAwesomeIcon icon={['fab', 'hotjar']} />
        Hot
      </Link>
      <div className="menu left">
        <Link className="btn item" href={`/`}>
          <FontAwesomeIcon icon={['fab', 'hotjar']} />
          Hot
        </Link>
        <Link className="btn item" href={`/`}>
          <FontAwesomeIcon icon={['fas', 'arrow-up']} />
          Top
        </Link>
        <Link className="btn item" href={`/`}>
          <FontAwesomeIcon icon={['fas', 'clock']} />
          New
        </Link>
      </div>
    </div>
  )
}
