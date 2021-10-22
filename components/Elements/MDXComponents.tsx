// @ts-nocheck
import ReactPlayer from 'react-player'
// import Image from 'components/Elements/Image'
import Image from 'next/image'
import DownloadFiles from 'components/Posts/DownloadFiles'

function Downloads({ children }) {
  //console.log('Children:', children)
  return <DownloadFiles files={children} />
}

function Heading({ children, id, level }) {
  const Comp = level === 2 ? 'h2' : 'h3'
  return (
    <Comp id={id}>
      <a href={`#${id}`}>
        {children}
      </a>
    </Comp>
  )
}

function Video({ children, url }) {
  return <ReactPlayer url={url} />
}


function Img(props) {
  return (
    <div>
      <Image {...props} src={props.thumbnail} width={320} height={180} layout="responsive" />
    </div>
  )
}

const components = {
  Heading,
  Downloads,
  Video,
  Img
}

export default components
