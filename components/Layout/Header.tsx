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
          <span className="logo-bold">lumen</span>writes
        </Link>
        <nav>
          <Link href={`/`} className="btn btn-nav">
            Blog
          </Link>
          <Link href={`/projects`} className="btn btn-nav">
            My Projects
          </Link>
          <Link href={`/about`} className="btn btn-nav">
            About
          </Link>
          {/* 
          <div className="btn btn-nav btn-cta" onClick={()=> toggleModal('subscribe')}>
            Subscribe
          </div>
           */}
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
    <div className="dropdown">
      <Link href="/" className="menu-handle btn right">
        Resources
      </Link>
      <div className="menu left">
        {/* <a className="btn item" target="_blank" href="https://discord.gg/JZmXfWD85D">
          Our Discord
        </a> */}
        <Link className="btn item" href={`/`}>
          Tutorials
        </Link>
        <Link className="btn item" href={`/course/first-person-shooter`}>
          FPS Course
        </Link>
        <a
          className="btn item"
          target="_blank"
          rel="noopener noreferrer"
          href="https://perchance.org/adventure-prompts"
        >
          Adventure Prompts
        </a>
      </div>
    </div>
  )
}
