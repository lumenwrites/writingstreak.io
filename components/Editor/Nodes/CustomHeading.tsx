import { Node } from '@tiptap/core'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'

// https://github.com/ueberdosis/tiptap/issues/586#issuecomment-836466931
// https://discuss.prosemirror.net/t/ms-word-style-text-alignment-a-walkthrough/1555
// https://github.com/ueberdosis/tiptap/blob/main/packages/extension-heading/src/heading.ts
const CustomHeading = Heading.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: '',
      },
    }
  },
  addCommands() {
    return {
      ...this.parent?.(),
      setClassName: (className) => ({ commands }) => {
        return commands.updateAttributes('heading', { class: className})
      },
    }
  },
})

export default CustomHeading

// toDOM (node) {
//   return ['p', { class: node.attrs.class }, 0]
// },
