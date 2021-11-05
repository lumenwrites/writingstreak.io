// @ts-nocheck
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactPlayer from 'react-player'
// import Image from 'components/Elements/Image'
import Image from 'next/image'
import Link from 'components/Elements/Link'

import Cookies from 'js-cookie'
import { useModal } from 'context/ModalContext'

import DownloadsModal from 'components/Layout/DownloadsModal'
import CourseCTA from './CourseCTA'

function Downloads({ children, emailgate = false }) {
  const { toggleModal } = useModal()

  function openModal() {
    const subscribed = Cookies.get('subscribed')
    if (subscribed || !emailgate) {
      toggleModal('download-files')
    } else {
      toggleModal('subscribe')
    }
  }
  if (!children) return null
  return (
    <div>
      <button className="btn btn-cta download-project-files" onClick={openModal}>
        Download Files
      </button>
      <DownloadsModal files={children} />
    </div>
  )
}

function Heading({ children, id, level }) {
  const Comp = level === 2 ? 'h2' : 'h3'
  return (
    <Comp id={id}>
      <a href={`#${id}`}>{children}</a>
    </Comp>
  )
}

function Video(props) {
  const { className, url } = props
  return <ReactPlayer className={`video-responsive ${className}`} width="100%" height="100%" url={url} />
}

function Img(props) {
  return (
    <div>
      <Image {...props} src={props.thumbnail} width={320} height={180} layout="responsive" />
    </div>
  )
}

// Doesn't work if I want to show a different button to the logged in user
function LandingCTA({ children, href }) {
  return (
    <div className="center-text">
      <Link href={href} className="btn btn-cta-landing">
        {children}
      </Link>
    </div>
  )
}

function CharacterBox(props) {
  return (
    <div className="character-box">
      {props.src && <div className={`token ${props.frame ? 'frame':''}`} style={{ background: `url(${props.src})`, backgroundSize: 'cover' }} />}
      {/* <img src={props.src} /> */}
      <div className="character-description">{props.children}</div>
      {/* <div className="clearfix"/> */}
    </div>
  )
}

function Collapsible({ title, children }) {
  const [expanded, setExpanded] = useState(false)
  const header = (
    <div className={`title ${expanded && 'expanded'}`} onClick={() => setExpanded((prev) => !prev)}>
      {expanded && <FontAwesomeIcon icon={['fas', 'caret-down']} />}
      {!expanded && <FontAwesomeIcon icon={['fas', 'caret-right']} />}
      {title}
    </div>
  )

  return (
    <div className="collapsible">
      {header}
      {expanded && <div className="body">{children}</div>}
    </div>
  )
}

const components = {
  Heading,
  Downloads,
  Video,
  Img,
  LandingCTA,
  CharacterBox,
  Collapsible,
  CourseCTA,
}

export default components
