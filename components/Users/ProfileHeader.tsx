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
        Startup Founder, Web Developer, Writer. Developer of this website. I write things that gratify my intellectual
        curiosity. I'm curious about startups, tech, webdev, gamedev, rationality, creativity, and writing.
      </div>
      <div className="clearfix" />
      <div className="profile-footer">
        <div className="social-links">
          <div className="social-link">
            <FontAwesomeIcon icon={['fas', 'envelope']} />
            lumenwrites@gmail.com
          </div>
          <a className="social-link" href="https://lumenwrites.dev">
            <FontAwesomeIcon icon={['fas', 'globe-americas']} />
            lumenwrites.dev
          </a>
          <a className="social-link" href="https://lumenwrites.dev">
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
