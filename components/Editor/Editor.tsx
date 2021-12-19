import moment from 'moment'
import { useState, useEffect, useRef, useContext, createContext } from 'react'

import EditorHeader from './EditorHeader'
import TipTap from './TipTap'
import TagsInput from 'components/Editor/TagsInput'
import PublishButtons from './PublishButtons'
import TwitterFooter from './TwitterFooter'
import ImageCaptureWrappers from './ImageCaptureWrappers'

const EditorContext = createContext({
  editorValues: {} as any,
  setValue: (name, value) => {},
  setValues: function () {} as any, // used in timer
})

export function useEditorContext() {
  return useContext(EditorContext)
}

export default function Editor({ post, user, days }) {
  const saveTimer = useRef(null)
  const lastSavedDay = days[0]
  const doLoadTodaysStatsFromDb = moment().format('YYYY-MM-DD') === lastSavedDay.date
  // All initial stats are fetched in create.tsx and edit.tsx
  const [editorValues, setValues] = useState({
    title: '',
    html: '',
    tags: [],
    height: 0,
    lastPressedKey: '',
    saved: true,
    // So I could save the post in PublishButtons
    postSlug: post ? post.slug : undefined, 
    published: post ? post.published : false,
    // Streak
    streak: 0,
    habitStrength: 0,
    completedDays: 0,
    // Timeline
    // Last 30 days to render into the timeline
    days: days, 
    // Writing stats inside of the rightmost day in the timeline update interactively as I type
    // If I already wrote today and saved the post/stats into the db, I load them in. Otherwise I start at 0.
    wordCount: doLoadTodaysStatsFromDb ? lastSavedDay.wordCount : 0,
    writingTime: doLoadTodaysStatsFromDb ? lastSavedDay.writingTime : 0,
    // Timer
    healthLeft: 100,
    secondsLeft: 0,
    // Settings
    username: user.username,
    twitter: user.twitter,
    targetWordCount: user.targetWordCount,
    writingDays: user.writingDays,
    sprintPace: user.sprintPace,
    sprintDuration: user.sprintDuration,
  })

  function setValue(name, value) {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  function onCreate({ editor }) {
    // To edit the post in edit.tsx, load the post into the editor.
    // In create.tsx post is null, so editor remains blank.
    if (post) {
      setValues((prev) => ({
        ...prev,
        html: editor.getHTML(),
        title: post.title,
        tags: post.tags,
      }))
    }
  }
  function onUpdate({ editor }) {
    // Save timer. Reset timer as I type, save when I stop for a second.
    clearInterval(saveTimer.current)
    setValue('saved', false)
    saveTimer.current = setInterval(() => {
      document.getElementById('save-post')?.click()
      setValue('saved', true)
      clearInterval(saveTimer.current)
    }, 2000)

    // Update info and stats
    setValues((prev) => ({
      ...prev,
      html: editor.getHTML(),
      healthLeft: Math.min(prev.healthLeft + 5, 100),
    }))
  }
  function keyDown(view, event) {
    setValues((prev) => {
      if (event.key === ' ' && prev.lastPressedKey !== ' ') {
        return { ...prev, lastPressedKey: event.key, wordCount: prev.wordCount + 1 }
      }
      return { ...prev, lastPressedKey: event.key }
    })
  }
  return (
    <EditorContext.Provider value={{ editorValues, setValue, setValues }}>
      <EditorHeader />
      <div className="wrapper">
        <ImageCaptureWrappers>
          <div className="editor text">
            <Title />
            <TipTap content={post ? post.body : ''} onUpdate={onUpdate} onCreate={onCreate} keyDown={keyDown} />
          </div>
          <TagsInput initialTags={post ? post.tags : []} onChange={(tags) => setValue('tags', tags)} />
          <TwitterFooter />
        </ImageCaptureWrappers>
        <PublishButtons />
        <br />
        <div id="bottom-of-the-page" />
      </div>
    </EditorContext.Provider>
  )
}

function Title() {
  const { editorValues, setValue } = useEditorContext()
  return (
    <div className="post-title orange">
      <input placeholder="Title..." value={editorValues.title} onChange={(e) => setValue('title', e.target.value)} />
    </div>
  )
}
