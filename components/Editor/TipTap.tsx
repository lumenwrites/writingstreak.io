import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import Placeholder from '@tiptap/extension-placeholder'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Dropcursor from '@tiptap/extension-dropcursor'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Link from '@tiptap/extension-link'

// Custom Elements
import MyBubbleMenu from './MyBubbleMenu'
import MyFloatingMenu from './MyFloatingMenu'
// Custom Nodes
import CustomHeading from './Nodes/CustomHeading'
// Custom Document
const CustomDocument = Document.extend({
  content: 'heading block*',
})

export default function TipTap({ content, onUpdate, onCreate, keyDown }) {
  const editor = useEditor({
    extensions: [
      // CustomDocument,
      Document,
      StarterKit.configure({
        document: false,
        heading: false,
        paragraph: false,
        text: false,
        dropcursor: false,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return 'Title...'
          }
          return 'Write something...'
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline.configure({
        HTMLAttributes: {
          class: 'underlined',
        },
      }),
      Link.configure({
        autolink: true,
        openOnClick: true,
        linkOnPaste: true,
      }),
      Color.configure({
        types: ['textStyle'],
      }),
      Highlight,
      Typography,
      Paragraph,
      Text,
      Image,
      Dropcursor,
      CustomHeading,
      TextStyle,
    ],
    content,
    onCreate: ({ editor }) => {
      onCreate({ editor })
    },
    onUpdate: ({ editor }) => {
      onUpdate({ editor })
    },
    // https://prosemirror.net/docs/ref/#view.EditorProps
    // https://tiptap.dev/api/editor/#editor-props
    // https://stackoverflow.com/questions/68814136/tiptap-vuejs-how-to-detect-a-keypress
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
      handleDOMEvents: { 
        keydown: (view, event) => {
          keyDown(view, event)
          return false;
        }
      },
    },
  })

  return (
    <>
      <EditorContent className="tiptap" editor={editor} />
      <MyBubbleMenu editor={editor} />
      <MyFloatingMenu editor={editor} />
    </>
  )
}
