import { useState, useEffect, useRef } from 'react'

import EditorHeader from './EditorHeader'
import TipTap from './TipTap'
import TagsInput from 'components/Editor/TagsInput'
import PublishButtons from './PublishButtons'
import TwitterFooter from './TwitterFooter'
import ImageCaptureWrappers from './ImageCaptureWrappers'
import { useEditorInfo } from 'context/EditorContext'

export default function Editor({ post }) {
  const { editorInfo, setEditorInfo } = useEditorInfo()
  const saveTimer = useRef(null)
  const [saved, setSaved] = useState(true)

  function titleChange(e) {
    setEditorInfo((prev) => ({ ...prev, title: e.target.value }))
  }
  function tagsChange(tags) {
    setEditorInfo((prev) => ({ ...prev, tags }))
  }
  function onCreate({ editor }) {
    // Once the editor has loaded post's contents and rendered, put its value into state
    if (post) {
      setEditorInfo((prev) => ({
        ...prev,
        html: editor.getHTML(),
        title: post.title,
        tags: post.tags,
        // wordCount: editor.state.doc.textContent.split(' ').length,
        // healthLeft: Math.min(prev.healthLeft + 5, 100),
      }))
    }
  }
  function onUpdate({ editor }) {
    // console.log('Update', editor)
    // Save timer. Reset timer as I type, save when I stop for a second.
    clearInterval(saveTimer.current)
    setSaved(false)
    saveTimer.current = setInterval(() => {
      document.getElementById('save-post')?.click()
      setSaved(true)
      clearInterval(saveTimer.current)
    }, 2000)

    // Update info and stats
    setEditorInfo((prev) => ({
      ...prev,
      html: editor.getHTML(),
      // wordCount: editor.state.doc.textContent.split(' ').filter((w) => (w.trim().length ? true : false)).length,
      healthLeft: Math.min(prev.healthLeft + 5, 100),
    }))
  }
  function keyDown(view, event) {
    setEditorInfo((prev) => {
      if (event.key === " " && prev.lastPressedKey !== " ") {
        return { ...prev, lastPressedKey: event.key, wordCount: prev.wordCount + 1 }
      }
      return { ...prev, lastPressedKey: event.key }
    })
  }
  return (
    <>
      <EditorHeader />
      <div className="wrapper">
        <ImageCaptureWrappers>
          <div className="editor text">
            <div className="post-title orange">
              <input placeholder="Title..." value={editorInfo.title} onChange={titleChange} />
            </div>
            <TipTap content={post ? post.body : ''} onUpdate={onUpdate} onCreate={onCreate} keyDown={keyDown} />
          </div>
          <TagsInput initialTags={post ? post.tags : []} onChange={tagsChange} />
          <TwitterFooter />
        </ImageCaptureWrappers>
        <PublishButtons post={post} saved={saved} />
        <br />
        <div id="bottom-of-the-page" />
      </div>
    </>
  )
}
