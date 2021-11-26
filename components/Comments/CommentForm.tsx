import axios from 'axios'
import { useAuth } from 'context/AuthContext'
import { useModal } from 'context/ModalContext'
import { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import MessagePanel from 'components/Elements/MessagePanel'
import SpinnerButton from 'components/Elements/SpinnerButton'

export default function CommentForm({ post, parent }) {
  const { user } = useAuth()
  const [body, setBody] = useState('')
  const [status, setStatus] = useState({ state: 'error', message: '' })

  function onChange(e) {
    setBody(e.target.value)
    if (e.target.value.includes('http')) {
      setStatus((prev) => ({
        state: 'error',
        message:
          'Your comment appears to contain a link. To prevent spam, it will need to be approved by the moderator before it becomes visible to other users.',
      }))
    } else {
      setStatus((prev) => ({ state: '', message: '' }))
    }
  }
  async function handleSubmit(event) {
    event.preventDefault() // Block native form submission.
    setStatus({ state: 'loading', message: '' })
    // validate comment here
    const comment = {
      body: body,
      parentId: parent?.id,
      postId: post.id
    }
    console.log('[CommentForm] Submitting comment', comment)
    const { data } = await axios.post('/api/comments/create', comment)
    console.log('data error', data)
    if (data?.error) return setStatus({ state: 'error', message: data?.error })
    setStatus({ state: '', message: '' })
    setBody('')
    console.log('Created Comment', data)
  }

  if (!user) return <LoginToCommentCTA />
  return (
    <>
      <MessagePanel type={status.state} message={status.message} />
      <form className="comment-form loggedin1" onSubmit={handleSubmit}>
        <TextareaAutosize placeholder="Write your comment..." value={body} onChange={onChange} />
        <SpinnerButton isloading={status.state === 'loading'} type="submit">
          Comment
        </SpinnerButton>
        <div className="clearfix" />
      </form>
    </>
  )
}

function LoginToCommentCTA() {
  const { toggleModal } = useModal()
  return (
    <div>
      <a className="link-cta" onClick={() => toggleModal(`login`)}>
        Join or Login
      </a>{' '}
      to comment.
    </div>
  )
}
