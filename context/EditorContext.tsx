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
    height: 0,
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
    height: 0,
  })
  const context = { editorInfo, setEditorInfo }

  return <EditorInfoContext.Provider value={context}>{children}</EditorInfoContext.Provider>
}
export default EditorInfoContext
