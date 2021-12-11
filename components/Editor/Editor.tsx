import { useState, useEffect, useRef } from 'react'

import TipTap from './TipTap'
import TagsInput from 'components/Posts/TagsInput'
import PublishButtons from './PublishButtons'
import TwitterFooter from './TwitterFooter'
import ImageCaptureWrappers from './ImageCaptureWrappers'
import { useEditorInfo } from 'context/EditorContext'

export default function Editor({ post }) {
  const { editorInfo, setEditorInfo } = useEditorInfo()
  const saveTimer = useRef(null)
  const [saved, setSaved] = useState(true)

  function titleChange(e) {
    setEditorInfo((prev) => ({...prev, title: e.target.value}))
  }
  function tagsChange(tags) {
    setEditorInfo((prev) => ({...prev, tags}))
  }
  function onCreate({ editor }) {
    // Once the editor has loaded post's contents and rendered, put its value into state
    if (post) {
      setEditorInfo((prev) => ({
        ...prev,
        html: editor.getHTML(),
        title: post.title,
        tags: post.tags
      }))
    }
  }
  function onUpdate({ editor }) {
    setEditorInfo((prev) => ({...prev, html: editor.getHTML()}))
    // Save timer. Reset timer as I type, save when I stop for a second.
    clearInterval(saveTimer.current)
    setSaved(false)
    saveTimer.current = setInterval(() => {
      document.getElementById('save-post')?.click()
      setSaved(true)
      clearInterval(saveTimer.current)
    }, 2000)
  }
  return (
    <div className="wrapper">
      <ImageCaptureWrappers>
        <div className="editor text">
          <div className="post-title orange">
            <input placeholder="Title..." value={editorInfo.title} onChange={titleChange} />
          </div>
          <TipTap content={post ? post.body : ''} onUpdate={onUpdate} onCreate={onCreate}/>
        </div>
        <TagsInput initialTags={post ? post.tags : []} onChange={tagsChange} />
        <TwitterFooter />
      </ImageCaptureWrappers>
      <PublishButtons post={post} saved={saved} />
      <br />
      <div id="bottom-of-the-page" />
    </div>
  )
}
