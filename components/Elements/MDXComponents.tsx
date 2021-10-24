// @ts-nocheck
import ReactPlayer from 'react-player'
// import Image from 'components/Elements/Image'
import Image from 'next/image'
import Link from 'components/Elements/Link'
import DownloadFiles from 'components/Posts/DownloadFiles'

function Downloads({ children }) {
  //console.log('Children:', children)
  return <DownloadFiles files={children} />
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

function LandingCTA({ children, href }) {
  return (
    <div className="center-text">
      <Link href={href} className="btn btn-cta-landing">
        {children}
      </Link>
    </div>
  )
}

const components = {
  Heading,
  Downloads,
  Video,
  Img,
  LandingCTA,
}

export default components
