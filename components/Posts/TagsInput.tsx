import { useState, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import slugify from "slugify"

export default function TagsInput({ allTags, tags, setTags, customTags = false, placeholder = "Add up to 5 tags..." }) {
  const [val, setVal] = useState("")
  const inputRef = useRef(null)
  
  // Remove already selected tags from the list
  let listTags = allTags.filter((tag) => !tags.some((t) => t.slug === tag.slug))
  // Search through tags
  listTags = listTags.filter((tag) => tag.name.toLowerCase().includes(val.toLowerCase()))

  function handleChange(e) {
    const lastChar = e.target.value.slice(-1)
    if (lastChar === ",") return
    setVal(e.target.value)
  }
  function handleKeyDown(e) {
    // Remove previous tag
    if (e.key === "Backspace" && val.length === 0) {
      setTags((prev) => [...prev].splice(0, prev.length - 1))
    }
    if (e.key === "," || e.key === "Enter" || e.key === "Tab") {
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
    setVal("")
    inputRef?.current?.focus()
  }
  function renderAllTags() {
    if (listTags.length === 0) {
      return <div className="tag-item">No tags matching this search.</div>
    }
    return listTags.map((tag, i) => (
      <div className={`tag-item`} key={tag.slug} onClick={() => addTag(tag)}>
        {tag.name}
      </div>
    ))
  }

  return (
    <div className="tags-input">
      {tags.map((tag, i) => (
        <div className="tag" key={tag.slug} onClick={() => removeTag(tag)}>
          {tag.name}
          <FontAwesomeIcon icon={["fas", "times"]} />
        </div>
      ))}
      {tags.length < 5 && <input ref={inputRef} placeholder={placeholder} value={val} onChange={handleChange} onKeyDown={handleKeyDown} />}
      {tags.length < 5 && <div className="tags-list">{renderAllTags()}</div>}
      {/*  value={val} onChange={handleChange}  */}
    </div>
  )
}
