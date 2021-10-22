import ReactPlayer from 'react-player'
import { useRef, useState } from 'react'

export default function VideoPlayer({ url }) {
  const [playing, setPlaying] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(2)
  const [volume, setVolume] = useState(0.5)
  return (
    <div>
      <ReactPlayer
        url={url}
        playing={playing}
        volume={volume}
        playbackRate={playbackRate}
      />
      {/* <video ref={videoRef} src={url} /> */}
      <button onClick={() => setPlaying(prev => !prev)}>{playing ? "Pause" : "Play"}</button>
    </div>
  )
}
