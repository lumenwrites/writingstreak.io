import { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import MessagePanel from 'components/Elements/MessagePanel'
import SpinnerButton from 'components/Elements/SpinnerButton'

export default function CommentForm() {
  const [body, setBody] = useState('')
  const [status, setStatus] = useState({ state: 'error', message: '' })
  function onChange(e) {
    setBody(e.target.value)
    if (e.target.value.includes('http')) {
      setStatus((prev) => ({ state: 'error', message: 'Your comment appears to contain a link. To prevent spam, it will need to be approved by the moderator before it becomes visible to other users.' }))
    } else {
      setStatus((prev) => ({ state: '', message: '' }))
    }    
  }
  async function handleSubmit(event) {
    event.preventDefault() // Block native form submission.
    setStatus({ state: 'loading', message: '' })
  }
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
