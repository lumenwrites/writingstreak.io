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
  const doLoadTodaysStatsFromDb = lastSavedDay && moment().format('YYYY-MM-DD') === lastSavedDay.date
  // All initial stats are fetched in create.tsx and edit.tsx
  const [editorValues, setValues] = useState({
    editor: null,
    title: post ? post.title : '',
    tags: post ? post.tags : [],
    lastPressedKey: '',
    saved: true,
    // So I could save the post in PublishButtons
    postSlug: post ? post.slug : undefined,
    published: post ? post.published : false,
    // Post settings
    description:  post ? post.description : undefined,
    updatedPostSlug: post ? post.slug : undefined,
    canonicalUrl: post ? post.canonicalUrl : undefined,
    socialTitle: post ? post.socialTitle : undefined,
    socialDescription: post ? post.socialDescription : undefined,
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
    startDate: user.startDate,
    endDate: user.endDate,
    writingGoal: user.writingGoal,
  })

  function setValue(name, value) {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  function onCreate({ editor }) {
    // Save editor in state, used in PublishButtons to get the HTML value and save it to server
    setValues((prev) => ({...prev, editor}))
  }
  function onUpdate({ editor }) {
  }
  function keyDown(view, event) {
    // if (event.key === 'Backspace' || event.key === 'Delete') return event.preventDefault()
    // Causes rerender
    setValues((prev) => {
      startSaveTimer(prev.saved)
      const healthLeft = Math.min(prev.healthLeft + 5, 100)
      // Increment wordcount when I press space after a word
      let wordCount = prev.wordCount
      if (event.key === ' ' && prev.lastPressedKey !== ' ') wordCount += 1
      console.log('state', editorValues)
      return { ...prev, lastPressedKey: event.key, wordCount, healthLeft }
    })
  }
  function startSaveTimer(saved) {
    // Save timer. Reset timer as I type, save when I stop for a second.
    clearInterval(saveTimer.current)
    // Set saved to false only once, when it's true, to minimize rerenders.
    // Timer can't access editorValues.saved correctly (it'll always be the old value), so I have to pass it.
    if (saved) setValue('saved', false)
    saveTimer.current = setInterval(() => {
      document.getElementById('save-post')?.click()
      setValue('saved', true)
      clearInterval(saveTimer.current)
    }, 2000)
  }
  function updateTitle(e) {
    setValue('title', e.target.value)
    startSaveTimer(editorValues.saved)
  }
  function updateTags(tags) {
    setValue('tags', tags)
    startSaveTimer(editorValues.saved)
  }
  return (
    <EditorContext.Provider value={{ editorValues, setValue, setValues }}>
      <EditorHeader />
      <div className="wrapper">
        <ImageCaptureWrappers>
          <div className="editor text">
            <div className="post-title orange">
              <input placeholder="Title..." value={editorValues.title} onChange={updateTitle} />
            </div>
            <TipTap content={post ? post.body : ''} onUpdate={onUpdate} onCreate={onCreate} keyDown={keyDown} />
          </div>
          <TagsInput initialTags={post ? post.tags : []} onChange={updateTags} />
          <TwitterFooter />
        </ImageCaptureWrappers>
        <PublishButtons />
        <br />
        <div id="bottom-of-the-page" />
      </div>
    </EditorContext.Provider>
  )
}
