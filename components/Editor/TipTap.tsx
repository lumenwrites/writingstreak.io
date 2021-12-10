import { useState, useEffect } from 'react'
import { useEditor, EditorContent, ReactNodeViewRenderer, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import Document from '@tiptap/extension-document'
import Placeholder from '@tiptap/extension-placeholder'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Dropcursor from '@tiptap/extension-dropcursor'
// import FloatingMenu from '@tiptap/extension-floating-menu'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Link from '@tiptap/extension-link'
// import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
// import CodeBlockComponent from 'components/Editor/Blocks/CodeBlockComponent'
// import lowlight from 'lowlight'

import MyBubbleMenu from './MyBubbleMenu'
import MyFloatingMenu from './MyFloatingMenu'
import TwitterFooter from './TwitterFooter'
import TagsInput from 'components/Posts/TagsInput'

import CustomHeading from './Nodes/CustomHeading'
import PublishButtons from './PublishButtons'

const CustomDocument = Document.extend({
  content: 'heading block*',
})

export default function TipTap() {
  const loadedPost = JSON.parse(localStorage.getItem('savedPost')) || { title: '', html: '' }
  const [title, setTitle] = useState(loadedPost.title)
  const [tags, setTags] = useState([{ name: 'Writing', slug: 'writing' }])

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
        // floatingmenu: false,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return 'Title...'
          }
          return 'Write something...'
        },
      }),
      Highlight,
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
      // FloatingMenu.configure({
      //   // element: typeof window !== 'undefined' ? document.querySelector('.menu') : undefined,
      //   shouldShow: ({ editor, view, state, oldState }) => {
      //     // show the floating within any paragraph
      //     return true // editor.isActive('paragraph')
      //   },
      // }),
      // CodeBlockLowlight.extend({
      //   addNodeView() {
      //     return ReactNodeViewRenderer(CodeBlockComponent)
      //   },
      // }).configure({ lowlight }),
      Typography,
      Paragraph,
      Text,
      Image,
      Dropcursor,
      CustomHeading,
      TextStyle,
      Color.configure({
        types: ['textStyle'],
      }),
    ],
    content: loadedPost.html,
    // content: typeof window !== 'undefined' ? localStorage.getItem('savedPost') : {},
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      const savedPost = { title, html }
      localStorage.setItem('savedPost', JSON.stringify(savedPost))
    },
  })
  function titleChange(e) {
    setTitle(e.target.value)
    const savedPost = { title: e.target.value, html: editor.getHTML() }
    localStorage.setItem('savedPost', JSON.stringify(savedPost))
  }

  return (
    <>
      <div className="wrapper">
        <ImageCaptureWrappers>
          <div className="editor text">
            <div className="post-title orange">
              <input placeholder="Title..." value={title} onChange={titleChange} />
            </div>
            <EditorContent className="tiptap" editor={editor} />
            <MyBubbleMenu editor={editor} />
            <MyFloatingMenu editor={editor} />
          </div>
          <TagsInput allTags={allTags} tags={tags} setTags={setTags} />
          <TwitterFooter />
        </ImageCaptureWrappers>
        <PublishButtons title={title} editor={editor} tags={tags} />
        <br />
      </div>
    </>
  )
}

function ImageCaptureWrappers({ children }) {
  return (
    <div className="position-image capturing1" id="position-image">
      <div className="cropped-image" id="cropped-image">
        <div className="twitter-image" id="twitter-image">
          {children}
        </div>
      </div>
    </div>
  )
}

const allTags = [
  {
    name: 'Writing',
    slug: 'writing',
  },
  {
    name: 'Startup',
    slug: 'startup',
  },
  {
    name: 'Creativity',
    slug: 'creativity',
  },
]
