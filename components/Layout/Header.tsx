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
          adventures
        </Link>
        <nav>
          <Link href={`/`} className="btn btn-nav">
            Browse
          </Link>
          <DropdownMenu />
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
      <Link href="/" className="menu-handle btn right">
        Resources
      </Link>
      <div className="menu left">
        <a className="btn item" href="https://discord.gg/JZmXfWD85D">
          Our Discord
        </a>
        <Link className="btn item" href={`/course/adventure-academy`}>
          Adventure Academy
        </Link>
      </div>
    </div>
  )
}
