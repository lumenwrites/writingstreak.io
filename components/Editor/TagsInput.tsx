import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import slugify from 'slugify'

export default function TagsInput({ initialTags, onChange, customTags = true, placeholder = 'Add up to 5 tags...' }) {
  const [allTags, setAllTags] = useState([])
  const [tags, setTags] = useState(initialTags)
  const [val, setVal] = useState('')
  const inputRef = useRef(null)
  async function fetchAllTags() {
    const { data } = await axios.get('/api/posts/get-all-tags')
    setAllTags(data.allTags)
  }
  useEffect(() => {
    fetchAllTags()
  }, [])
  // This component takes care of tags in its own state.
  // When the tags change I just call a function of the parent component,
  // Send it the new tags, and it does whatever
  useEffect(() => {
    onChange(tags)
  }, [tags])

  // Remove already selected tags from the list
  let listTags = allTags.filter((tag) => !tags.some((t) => t.slug === tag.slug))
  // Search through tags
  listTags = listTags.filter((tag) => tag.name.toLowerCase().includes(val.toLowerCase()))

  function handleChange(e) {
    const lastChar = e.target.value.slice(-1)
    if (lastChar === ',') return
    setVal(e.target.value)
  }
  function handleKeyDown(e) {
    // Remove previous tag
    if (e.key === 'Backspace' && val.length === 0) {
      setTags((prev) => [...prev].splice(0, prev.length - 1))
    }
    if (e.key === ',' || e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault()
      if (customTags) {
        addTag({
          name: val.trim(),
          slug: slugify(val, { lower: true, strict: true }),
        })
      } else {
        addTag(listTags[0])
      }
    }
  }

  function removeTag(tag) {
    setTags((prev) => prev.filter((t) => t.slug !== tag.slug))
  }
  function addTag(tag) {
    // console.log("Add tag", tag)
    if (!tag || !tag.name || !tag.slug) return
    if (tags.find((t) => t.slug === tag.slug)) return

    setTags((prev) => [...prev, tag])
    setVal('')
    inputRef?.current?.focus()
  }
  function renderAllTags() {
    if (listTags.length === 0) {
      return <div className="btn item">No tags matching this search.</div>
    }
    return listTags.map((tag, i) => (
      <div className={`btn item`} key={tag.slug} onClick={() => addTag(tag)}>
        {tag.name}
      </div>
    ))
  }

  return (
    <div className="tags-input">
      <div className="tags">
        {tags.map((tag, i) => (
          <div className="tag" key={tag.slug} onClick={() => removeTag(tag)}>
            {tag.name}
            <FontAwesomeIcon icon={['fas', 'times']} />
          </div>
        ))}
      </div>
      {tags.length < 5 && (
        <div className="input-wrapper">
          <div className="dropdown">
            <input
              ref={inputRef}
              placeholder={placeholder}
              value={val}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <div className="menu up">{renderAllTags()}</div>
          </div>
        </div>
      )}
      {/*  value={val} onChange={handleChange}  */}
    </div>
  )
}
