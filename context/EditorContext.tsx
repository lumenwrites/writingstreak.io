import { createContext, useState } from 'react'
import { useContext } from 'react'

const EditorInfoContext = createContext({
  editorInfo: {
    title: '',
    html: '',
    tags: [],
    targetWordCount: 250,
    wordCount: 0,
    writingTime: 0,
    healthLeft: 100,
    secondsLeft: 0,
    streak: 0,
    habitStrength: 0,
    completedDays: 0,
    height: 0,
    lastPressedKey: "",
  },
  setEditorInfo: (editorInfo) => {},
})

export function useEditorInfo() {
  return useContext(EditorInfoContext)
}

export function EditorInfoContextProvider({ children }) {
  const [editorInfo, setEditorInfo] = useState({
    title: '',
    html: '',
    tags: [],
    targetWordCount: 250,
    wordCount: 0,
    writingTime: 0,
    healthLeft: 100,
    secondsLeft: 0,
    streak: 0,
    habitStrength: 0,
    completedDays: 0,
    height: 0,
    lastPressedKey: "",
  })
  const context = { editorInfo, setEditorInfo }

  return <EditorInfoContext.Provider value={context}>{children}</EditorInfoContext.Provider>
}
export default EditorInfoContext
