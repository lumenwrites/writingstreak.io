import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'components/Elements/Link'

export default function Subnav() {
  return (
    <div className="subnav-wrapper">
      <div className="subnav">
        <div className="dropdown sorting">
          <Link className="menu-handle btn btn-nav" href={`/`}>
            <FontAwesomeIcon icon={['fas', 'arrow-up']} />
            Top
          </Link>
          <div className="menu">
            <Link className="btn item" href={`/`}>
              <FontAwesomeIcon icon={['fab', 'hotjar']} />
              Hot
            </Link>
            <Link className="btn item" href={`/`}>
              <FontAwesomeIcon icon={['fas', 'arrow-up']} />
              Top
            </Link>
            <Link className="btn item" href={`/`}>
              <FontAwesomeIcon icon={['fas', 'clock']} />
              New
            </Link>
          </div>
        </div>
        <div className="dropdown period">
          <Link className="menu-handle btn btn-nav" href={`/`}>
            <FontAwesomeIcon icon={['fas', 'calendar-week']} />
            Week
          </Link>
          <div className="menu">
            <Link className="btn item" href={`/`}>
              <FontAwesomeIcon icon={['fas', 'calendar-day']} />
              Today
            </Link>
            <Link className="btn item" href={`/`}>
              <FontAwesomeIcon icon={['fas', 'calendar-week']} />
              Week
            </Link>
            <Link className="btn item" href={`/`}>
              <FontAwesomeIcon icon={['far', 'calendar']} />
              Month
            </Link>
            <Link className="btn item" href={`/`}>
              <FontAwesomeIcon icon={['fas', 'calendar-alt']} />
              Year
            </Link>
            <Link className="btn item" href={`/`}>
              <FontAwesomeIcon icon={['fas', 'calendar']} />
              All
            </Link>
          </div>
        </div>
        {/* <div className="separator" /> */}
        <Link className="btn item" href={`/`}>
          <FontAwesomeIcon icon={['fas', 'times']} />
          Writing
        </Link>
        <div className="dropdown select-tag">
          {/* <Link className="btn item" href={`/`}>
            <FontAwesomeIcon icon={['fas', 'times']} />
            Writing
          </Link> */}
          <input placeholder="Select tag..."></input>
          <div className="menu">
            <Link className="btn item" href={`/`}>
              Writing
            </Link>
            <Link className="btn item" href={`/`}>
              Startups
            </Link>
            <Link className="btn item" href={`/`}>
              Technology
            </Link>
            <Link className="btn item" href={`/`}>
              Creativity
            </Link>
          </div>
        </div>

        <div className="search-wrapper">
          <FontAwesomeIcon icon={['fas', 'search']} />
          <input className="search" placeholder="Search..."></input>
        </div>
        <div className="clearfix" />
      </div>
    </div>
  )
}
