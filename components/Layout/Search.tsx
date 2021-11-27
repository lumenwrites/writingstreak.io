import { useState } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'components/Elements/Link'

export default function Search() {
  const router = useRouter()
  const [searchString, setSearchString] = useState(router?.query?.search || '')

  function search(e) {
    if (!(e.key == 'Enter' || !e.key)) return // search on enter or on search-button click
    let { search, page, ...baseQuery } = router.query
    // console.log('query', router.query, baseQuery, router.pathname)
    if (searchString.length === 0) {
      router.push({ query: baseQuery })
      return
    }
    router.push({ query: { ...baseQuery, search: searchString } })
  }

  return (
    <div className="search-wrapper">
      <button className="search-button" onClick={search}>
        <FontAwesomeIcon icon={['fas', 'search']} />
      </button>
      <input
        className="search"
        placeholder="Search..."
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        onKeyDown={search}
      ></input>
    </div>
  )
}
