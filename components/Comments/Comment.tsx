import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CommentForm from './CommentForm'
export default function Comment({ comment }) {
  const [expanded, setExpanded] = useState(true)
  const [showReplyForm, setShowReplyForm] = useState(false)
  if (!expanded) {
    return (
      <div className="comment">
        <div className="collapse" onClick={() => setExpanded((prev) => !prev)}>
          <FontAwesomeIcon icon={['fas', 'plus-square']} />
          <div className="collapse-line"></div>
        </div>
        <div className="elements-wrapper">
          <h2 className="username">{comment.username}</h2>
        </div>
      </div>
    )
  }
  return (
    <div className="comment">
      <div className="collapse" onClick={() => setExpanded((prev) => !prev)}>
        <FontAwesomeIcon icon={['fas', 'minus-square']} />
        <div className="collapse-line"></div>
      </div>
      <div className="elements-wrapper">
        <h2 className="username">{comment.username}</h2>
        <div className="body">{comment.body}</div>
        <div className="footer">
          <button>
            <FontAwesomeIcon icon={['fas', 'arrow-up']} />
            {comment.upvotes}
          </button>
          <button>
            <FontAwesomeIcon icon={['fas', 'arrow-down']} />
            {comment.downvotes}
          </button>
          <button onClick={() => setShowReplyForm((prev) => !prev)}>Reply</button>
          {/* <button>Edit</button> */}
          {/* <button>Delete</button> */}
        </div>
        {showReplyForm && <CommentForm />}
        <div className="replies">
          {comment.children.map((reply) => (
            <Comment key={reply.id} comment={reply} />
          ))}
        </div>
      </div>
    </div>
  )
}
