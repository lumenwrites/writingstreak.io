import Link from 'components/Elements/Link'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import allTags from 'backend/json/out/tags.json'

export default function SelectTag() {
  const router = useRouter()
  const [searchString, setSearchString] = useState('')
  const [tags, setTags] = useState(allTags)
  // Selected tags
  let { tag, ...baseQuery } = router.query
  if (router.query.tag) {
    const capitalize = tag.toString().charAt(0).toUpperCase() + tag.slice(1)
    return (
      <a className="btn item" onClick={() => router.push({ query: { ...baseQuery } })}>
        <FontAwesomeIcon icon={['fas', 'times']} />
        {capitalize}
      </a>
    )
  }
  return null
  function search(e) {
    setSearchString(e.target.value)
    const filteredTags = allTags.filter((tag) => tag.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setTags(filteredTags)
  }
  function clearSearch() {
    setSearchString("")
    setTags(allTags)
  }
  return (
    <div>
      {/* {/* <div className="separator" />  */}
      <div className="dropdown select-tag">
        <input
          placeholder="Select tag..."
          value={searchString}
          onChange={search}
          onBlur={clearSearch}
        ></input>
        <div className="menu">
          {tags.map((tag) => (
            <a
              className="btn item"
              key={tag.slug}
              onClick={() => router.push({ query: { ...baseQuery, tag: tag.slug } })}
            >
              {tag.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
