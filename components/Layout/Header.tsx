import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useModal } from 'context/ModalContext'
import Link from 'components/Elements/Link'
import { ToggleSidebarButton } from './Sidebar'

export default function Header() {
  const { toggleModal } = useModal()
  return (
    <header>
      <div className="wrapper">
        <ToggleSidebarButton />
        <div className="logo">
          <div className="logo-image">
            <Image src="/logo.png" width={32} height={32} />
          </div>
          Adventure Academy
        </div>
        <nav>
          <a className="btn btn-nav" href="https://discord.gg/JZmXfWD85D">
            Join Our Discord
          </a>
        </nav>
        {/* <nav> */}
        {/* <Link href={`/about`} className="btn btn-nav">
            <FontAwesomeIcon icon={['fas', 'info-circle']} />
            About
          </Link>
          <a className="btn btn-nav btn-cta" onClick={() => toggleModal(`subscribe`)}>
            Subscribe
          </a> */}
        {/* <Tutorials /> */}
        {/* </nav> */}
        <div className="clearfix" />
      </div>
    </header>
  )
}

function Tutorials() {
  return (
    <div className="dropdown">
      <Link href="/" className="menu-handle btn right">
        Tutorials
      </Link>
      <div className="menu left">
        <Link href={`/tag/3d`} className="btn item">
          3D
        </Link>
        <Link href={`/tag/3d`} className="btn item">
          2D
        </Link>
        <Link href={`/tag/3d`} className="btn item">
          Godot 101
        </Link>
      </div>
    </div>
  )
}
