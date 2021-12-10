import { useCallback } from 'react'
import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function MyBubbleMenu({ editor }) {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)
    if (url === null) return // cancelled
    if (url === '') {
      // empty
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])
  if (!editor) return null
  return (
    <BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100, appendTo: 'parent' }} editor={editor}>
      <button
        onClick={() => {
          if (editor.isActive('heading', { level: 1 })) {
            editor.chain().focus().unsetAllMarks().clearNodes().setParagraph().run()
          } else {
            editor.chain().focus().unsetAllMarks().clearNodes().toggleHeading({ level: 1 }).run()
          }
        }}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        <FontAwesomeIcon icon={['fas', 'heading']} />1
      </button>
      <button
        onClick={() => {
          if (editor.isActive('heading', { level: 2 })) {
            editor.chain().focus().unsetAllMarks().clearNodes().setParagraph().run()
          } else {
            editor.chain().focus().unsetAllMarks().clearNodes().toggleHeading({ level: 2 }).run()
          }
        }}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        <FontAwesomeIcon icon={['fas', 'heading']} />2
      </button>
      <button
        onClick={() => {
          if (editor.isActive('heading', { level: 3 })) {
            editor.chain().focus().unsetAllMarks().clearNodes().setParagraph().run()
          } else {
            editor.chain().focus().unsetAllMarks().clearNodes().toggleHeading({ level: 3 }).run()
          }
        }}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        <FontAwesomeIcon icon={['fas', 'heading']} />3
      </button>
      <button
        onClick={() => {
          if (editor.isActive('blockquote')) {
            editor.chain().focus().clearNodes().setParagraph().run()
          } else {
            editor.chain().focus().clearNodes().setBlockquote().run()
          }
        }}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        <FontAwesomeIcon icon={['fas', 'quote-right']} />
      </button>
      <div className="separator" />
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
        disabled={editor.isActive('heading')}
      >
        <FontAwesomeIcon icon={['fas', 'bold']} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
        disabled={editor.isActive('heading')}
      >
        <FontAwesomeIcon icon={['fas', 'italic']} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={editor.isActive('highlight') ? 'is-active' : ''}
        disabled={editor.isActive('heading')}
      >
        <FontAwesomeIcon icon={['fas', 'highlighter']} />
      </button>
      <button
        onClick={setLink}
        className={editor.isActive('link') ? 'is-active' : ''}
        disabled={editor.isActive('heading')}
      >
        <FontAwesomeIcon icon={['fas', 'link']} />
      </button>
    </BubbleMenu>
  )
}

function FormatText({ editor }) {
  return <></>
}
