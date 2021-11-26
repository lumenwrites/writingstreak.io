import axios from 'axios'
import { useRouter } from 'next/router'
import { useAuth } from 'context/AuthContext'
import { useModal } from 'context/ModalContext'
import { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import MessagePanel from 'components/Elements/MessagePanel'
import SpinnerButton from 'components/Elements/SpinnerButton'

export default function CommentForm({ post, parent, setComments, setShowReplyForm = null}) {
  const router = useRouter()
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
    // console.log('[CommentForm] Submitting comment', comment)
    const { data } = await axios.post('/api/comments/create', comment)
    // console.log('[CommentForm] Created comment', data.createdComment)
    if (data?.error) return setStatus({ state: 'error', message: data?.error })
    // Add comment to the state to display it immediately
    setComments(prev => [...prev, data.createdComment])
    // Add comment id to the query so that Comments knows to scroll to it
    router.push({ query: { ...router.query, commentId: data.createdComment.id } }, undefined, { scroll: false })
    setStatus({ state: '', message: '' })
    setBody('')
    // Hide this reply form (exists only under comments, not in the main comment form)
    if (setShowReplyForm) setShowReplyForm(false)
  }

  if (!user) return <LoginToCommentCTA />
  return (
    <>
      <MessagePanel type={status.state} message={status.message} />
      <form className="comment-form loggedin1" onSubmit={handleSubmit}>
        <TextareaAutosize placeholder="Write your comment..." value={body} onChange={onChange} />
        <SpinnerButton className="btn btn-cta" isloading={status.state === 'loading'} type="submit">
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
