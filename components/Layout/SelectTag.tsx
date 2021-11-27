import Link from 'components/Elements/Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'

export default function SelectTag() {
  const router = useRouter()
  // Fetch Tags
  if (router.query.tag) {
    let { tag, ...baseQuery } = router.query
    const capitalize = tag.toString().charAt(0).toUpperCase() + tag.slice(1)
    return (
      <a className="btn item" onClick={() => router.push({ query: { ...baseQuery } })}>
        <FontAwesomeIcon icon={['fas', 'times']} />
        {capitalize}
      </a>
    )
  }
  return null
  return (
    <div>
      {/* {/* <div className="separator" />  */}
      <div className="dropdown select-tag">
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
    </div>
  )
}
