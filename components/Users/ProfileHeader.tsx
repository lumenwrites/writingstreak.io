import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ProfileHeader() {
  return (
    <div className="profile-header">
      <div className="avatar">
        <Image src="/img/lumen-avatar-full.png" width={80} height={80} />
      </div>
      <h1>lumen</h1>
      <div className="bio">
        Startup Founder, Web Developer, Writer. Created this website. I write things that gratify my intellectual
        curiosity. I'm curious about startups, tech, webdev, gamedev, rationality, creativity, and writing.
      </div>
      <div className="clearfix" />
      <div className="profile-footer">
        <div className="bio-links">
          <a href={"mailto:lumenwrites@gmail.com"} className="bio-link">
            <FontAwesomeIcon icon={['fas', 'envelope']} />
            lumenwrites@gmail.com
          </a>
          <a className="bio-link" href="https://lumenwrites.dev" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={['fas', 'globe-americas']} />
            lumenwrites.dev
          </a>
          <a className="bio-link" href="https://lumenwrites.dev" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={['fab', 'twitter']} />
            {/* @lumenwrites */}
          </a>
          {/* <a className="social-link tag" href="https://lumenwrites.dev">
            Follow
          </a> */}
        </div>
      </div>
    </div>
  )
}
