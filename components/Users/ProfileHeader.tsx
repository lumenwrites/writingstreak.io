import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Heatmap from 'components/Stats/Heatmap'

export default function ProfileHeader() {
  return (
    <div className="profile-header">
      <div className="wrapper">
        <h1>lumen</h1>
        <div className="bio">
          Startup Founder, Web Developer, Writer. <br /> I write about things that gratify my intellectual curiosity.
          <div className="bio-links">
            <a href={'mailto:lumenwrites@gmail.com'} className="bio-link" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={['fas', 'envelope']} />
            </a>
            <a className="bio-link" href="https://lumenwrites.dev" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={['fas', 'globe-americas']} />
            </a>
            <a className="bio-link" href="https://lumenwrites.dev" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={['fab', 'twitter']} />
            </a>
          </div>
        </div>
        <Heatmap />
        <div className="clearfix" />
      </div>
    </div>
  )
}
