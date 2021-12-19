import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Heatmap from 'components/Stats/Heatmap'

export default function ProfileHeader({ profile, days }) {
  return (
    <div className="profile-header">
      <div className="wrapper">
        <h1>{profile.username}</h1>
        <div className="bio">
          {profile.bio}
          <div className="bio-links">
            {/* <a href={'mailto:lumenwrites@gmail.com'} className="bio-link" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={['fas', 'envelope']} />
            </a> */}
            {profile.website && (
              <a className="bio-link" href={profile.website} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={['fas', 'globe-americas']} />
              </a>
            )}
            {profile.twitter && (
              <a className="bio-link" href={`https://twitter.com/${profile.twitter}`} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={['fab', 'twitter']} />
              </a>
            )}
          </div>
        </div>
        <Heatmap days={days} />
        <div className="clearfix" />
      </div>
    </div>
  )
}
