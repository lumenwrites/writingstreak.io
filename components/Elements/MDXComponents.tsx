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

function CourseCTA() {
  return (
    <div className="course-cta">
      <h3>Learn to create a First Person Shooter in Godot</h3>
      <p>
        Step-by-step guide to creating your own FPS game from scratch using Godot Engine. I have created an{' '}
        <Link href="/course/adventure-academy">adventure writing course</Link> where I share everything I know about
        creating adventures. Check it out to learn an easy to follow step-by-step process for creating awesome
        adventures for roleplaying games.
      </p>
    </div>
  )
}

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
  return (
    <div className={className}>
      <ReactPlayer className={`video-responsive`} controls width="100%" height="100%" url={url} />
    </div>
  )
}

// https://ironeko.com/posts/how-to-use-next-js-image-with-markdown-or-mdx
// https://nextjs.org/docs/api-reference/next/image#layout
// layout="fill" objectFit="contain"
// layout="responsive"
// layout="intrinsic"
function img(props) {
  return <img {...props}/>
  return (
    <div className={`image ${props.className}`}>
      {/* <Image className="next-image" {...props} layout="responsive" loading="lazy"/> */}
      <Image src={props.src} layout="fill" objectFit="contain" loading="lazy" />
      {/* <Image {...props} layout="responsive" loading="lazy" /> */}
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
      {props.src && (
        <div
          className={`token ${props.frame ? 'frame' : ''}`}
          style={{ background: `url(${props.src})`, backgroundSize: 'cover' }}
        />
      )}
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
  img,
  LandingCTA,
  CharacterBox,
  Collapsible,
  CourseCTA,
}

export default components
