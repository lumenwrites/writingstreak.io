import axios from 'axios'
import ytdl from 'ytdl-core'
import VideoPlayer from 'components/Elements/VideoPlayer'
export default function video({ url }) {
  return (
    <div>
      Video
      <VideoPlayer url={url} />
    </div>
  )
}

export async function getServerSideProps() {
  const info = await ytdl.getInfo('https://www.youtube.com/watch?v=cjqJVH-XmTQ')
  const url = ytdl.chooseFormat(info.formats, { quality: "highest" }).url
  return { props: { url } }
}
