import { useState } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'components/Elements/Link'

export default function Sorting() {
  const router = useRouter()
  let { sort, period, ...baseQuery } = router.query
  // console.log('rq', router.query)
  return (
    <div>
      <div className="dropdown sorting">
        <Link className="menu-handle btn btn-nav" href={`/`}>
          <MenuHandle />
        </Link>
        <div className="menu">
          <a className="btn item" onClick={() => router.push({ query: { ...baseQuery } })}>
            <FontAwesomeIcon icon={['fab', 'hotjar']} />
            Hot
          </a>
          <a className="btn item" onClick={() => router.push({ query: { ...baseQuery, sort: 'top' } })}>
            <FontAwesomeIcon icon={['fas', 'arrow-up']} />
            Top
          </a>
          <a className="btn item" onClick={() => router.push({ query: { ...baseQuery, sort: 'new' } })}>
            <FontAwesomeIcon icon={['fas', 'clock']} />
            New
          </a>
          {/*  
          <a className="btn item" onClick={() => router.push({ query: { ...baseQuery } })}>
            <FontAwesomeIcon icon={['fab', 'hotjar']} />
            Hot
          </a>
          <a className="btn item" onClick={() => router.push({ query: { ...baseQuery, sort: 'new' } })}>
            <FontAwesomeIcon icon={['fas', 'arrow-up']} />
            Top
          </a>
          <a className="btn item" onClick={() => router.push({ query: { ...baseQuery, sort: 'new' } })}>
            <FontAwesomeIcon icon={['fas', 'clock']} />
            New
          </a>

          <hr />
          <b className="label">Top posts:</b>
          <a className="btn item" onClick={() => router.push({ query: { ...baseQuery, sort: 'top', period: 'day' } })}>
            <FontAwesomeIcon icon={['fas', 'calendar-day']} />
            Today
          </a>
          <a className="btn item" onClick={() => router.push({ query: { ...baseQuery, sort: 'top', period: 'week' } })}>
            <FontAwesomeIcon icon={['fas', 'calendar-week']} />
            Week
          </a>
          <a
            className="btn item"
            onClick={() => router.push({ query: { ...baseQuery, sort: 'top', period: 'month' } })}
          >
            <FontAwesomeIcon icon={['far', 'calendar']} />
            Month
          </a>
          <a className="btn item" onClick={() => router.push({ query: { ...baseQuery, sort: 'top', period: 'year' } })}>
            <FontAwesomeIcon icon={['fas', 'calendar-alt']} />
            Year
          </a>
          <a className="btn item" onClick={() => router.push({ query: { ...baseQuery, sort: 'top', period: 'all' } })}>
            <FontAwesomeIcon icon={['fas', 'calendar']} />
            All Time
          </a>
          */}
        </div>
      </div>
      {/* 
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
         */}
    </div>
  )
}

function MenuHandle() {
  const router = useRouter()
  if (!router.query.sort) {
    return (
      <div>
        <FontAwesomeIcon icon={['fab', 'hotjar']} />
        Hot
      </div>
    )
  }
  if (router.query.sort === 'top') {
    return (
      <div>
        <FontAwesomeIcon icon={['fas', 'arrow-up']} />
        Top
      </div>
    )
  }
  if (router.query.sort === 'new') {
    return (
      <div>
        <FontAwesomeIcon icon={['fas', 'clock']} />
        New
      </div>
    )
  }
  if (router.query.period === 'day') {
    return (
      <div>
        <FontAwesomeIcon icon={['fas', 'calendar-day']} />
        Today
      </div>
    )
  }
  if (router.query.period === 'week') {
    return (
      <div>
        <FontAwesomeIcon icon={['fas', 'calendar-week']} />
        Week
      </div>
    )
  }
  if (router.query.period === 'month') {
    return (
      <div>
        <FontAwesomeIcon icon={['far', 'calendar']} />
        Month
      </div>
    )
  }
  if (router.query.period === 'year') {
    return (
      <div>
        <FontAwesomeIcon icon={['fas', 'calendar-alt']} />
        Year
      </div>
    )
  }
  if (router.query.period === 'day') {
    return (
      <div>
        <FontAwesomeIcon icon={['fas', 'calendar-day']} />
        Today
      </div>
    )
  }
  if (router.query.period === 'all') {
    return (
      <div>
        <FontAwesomeIcon icon={['fas', 'calendar']} />
        All Time
      </div>
    )
  }
  return null
}
