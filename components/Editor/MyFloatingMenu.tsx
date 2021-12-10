import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function MyFloatingMenu({ editor }) {
  if (!editor) return null
  const addImage = () => {
    const url = window.prompt('URL')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }
  function shouldShow({ editor, view, state, oldState }) {
    // Copied from here: https://github.com/ueberdosis/tiptap/blob/main/packages/extension-floating-menu/src/floating-menu-plugin.ts
    // Also want to avoid showing it for heading
    const { selection } = state
    const { $anchor, empty } = selection
    const isRootDepth = $anchor.depth === 1
    const isEmptyTextBlock = $anchor.parent.isTextblock
      && !$anchor.parent.type.spec.code
      && !$anchor.parent.textContent

    if (!empty || !isRootDepth || !isEmptyTextBlock || editor.isActive('heading')) {
      return false
    }

    return true
  }

  return (
    <FloatingMenu
      className="floating-menu"
      tippyOptions={{ duration: 0, placement: 'left', offset: [0, 5], appendTo: 'parent' }}
      shouldShow={shouldShow}
      editor={editor}
    >
      <div className="dropdown">
        <div className="handle">
          <FontAwesomeIcon icon={['fas', 'plus']} />
        </div>
        <div className="menu">
          <div className="btn item" onClick={addImage}>
            <FontAwesomeIcon icon={['fas', 'image']} />
            Image
          </div>
          <div onClick={() => editor.chain().focus().setCodeBlock().run()} className="btn item">
            <FontAwesomeIcon icon={['fas', 'code']} />
            Code Block
          </div>
          <div className="btn item" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
            <FontAwesomeIcon icon={['fas', 'grip-lines']} />
            Separator
          </div>
        </div>
      </div>
    </FloatingMenu>
  )
}
