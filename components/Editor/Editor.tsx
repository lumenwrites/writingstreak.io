import moment from 'moment'
import { useState, useEffect, useRef, useContext, createContext } from 'react'

import EditorHeader from './EditorHeader'
import TipTap from './TipTap'
import TagsInput from 'components/Editor/TagsInput'
import PublishButtons from './PublishButtons'
import TwitterFooter from './TwitterFooter'
import ImageCaptureWrappers from './ImageCaptureWrappers'
import { useUnsavedChangesWarning } from 'hooks/useWarnIfUnsavedChanges'
import { descriptionFromHTML } from './PublishButtons'
import slugify from 'slugify'

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
    saved: post ? true : false,
    // So I could save the post in PublishButtons
    postSlug: post ? post.slug : undefined,
    published: post ? post.published : false,
    // Post settings
    description: post ? post.description : undefined,
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
    targetWordcount: user.targetWordcount,
    writingDays: user.writingDays,
    sprintPace: user.sprintPace,
    sprintDuration: user.sprintDuration,
    blurredMode: user.blurredMode,
    typewriterMode: user.typewriterMode,
    startDate: user.startDate,
    endDate: user.endDate,
    writingGoal: user.writingGoal,
  })
  useUnsavedChangesWarning(!editorValues.saved)

  function setValue(name, value) {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  function onCreate({ editor }) {
    // Save editor in state, used in PublishButtons to get the HTML value and save it to server
    setValues((prev) => ({ ...prev, editor }))
  }
  function onUpdate({ editor }) {}
  function keyDown(view, event) {
    // Causes rerender
    setValues((prev) => {
      const typewriterMode = prev.typewriterMode && prev.secondsLeft > 0
      if (typewriterMode) {
        if (event.key === 'Backspace' || event.key === 'Delete') {
          event.preventDefault()
          return prev
        }
      }

      // I set saved to false when I have modified the text, title, or tags.
      // I set it back to true in PublishButtons, after saving was completed successfully.
      let saved = prev.saved
      let healthLeft = prev.healthLeft
      if (isLetterPressed(event)) {
        startSaveTimer()
        saved = false
        healthLeft = Math.min(prev.healthLeft + 2, 105)
      } 
      
      // Increment wordcount when I press space after a word
      let wordCount = prev.wordCount
      if (event.key === ' ' && prev.lastPressedKey !== ' ') wordCount += 1

      return { ...prev, lastPressedKey: event.key, wordCount, healthLeft, saved }
    })
  }
  function startSaveTimer() {
    // Save timer. Reset timer as I type, save when I stop for a second.
    clearInterval(saveTimer.current)
    saveTimer.current = setInterval(() => {
      console.log('Save timer expired, click save.')
      document.getElementById('save-post')?.click()
      clearInterval(saveTimer.current)
    }, 2000)
  }
  function updateTitle(e) {
    setValues((prev) => {
      startSaveTimer()
      return { ...prev, title: e.target.value, saved: false }
    })
  }
  function updateTags(tags) {
    // setValues((prev) => {
    //   // startSaveTimer()
    //   return { ...prev, tags, saved: false }
    // })
  }
  function saveToLocalStorage() {
    const post = {
      title: editorValues.title,
      body: editorValues.editor.getHTML(),
      description: descriptionFromHTML(editorValues.editor.getHTML()),
      tags: editorValues.tags,
      slug: editorValues.postSlug || slugify(editorValues.title, { lower: true, strict: true }), // todo should be unique
      published: editorValues.published,
    }
    localStorage.setItem(post.slug, JSON.stringify(post))
  }

  const blurText = editorValues.blurredMode && editorValues.secondsLeft > 0

  return (
    <EditorContext.Provider value={{ editorValues, setValue, setValues }}>
      <EditorHeader />
      <div className="wrapper">
        <ImageCaptureWrappers>
          <div className={`editor text ${blurText ? 'blurred' : ''}`}>
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

function isLetterPressed(event) {
  let isLetterPressed = false
  // https://stackoverflow.com/questions/4179708/how-to-detect-if-the-pressed-key-will-produce-a-character-inside-an-input-text
  if (String.fromCharCode(event.keyCode).match(/(\w|\s)/g)) {
    //pressed key is a char
    isLetterPressed = true
  }
  return isLetterPressed
}
