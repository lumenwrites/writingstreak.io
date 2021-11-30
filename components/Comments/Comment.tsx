import { useRouter } from 'next/router'
import { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CommentForm from './CommentForm'
import { markdownToHtml } from 'backend/markdown'

export default function Comment({ comment, post, setComments }) {
  const router = useRouter()
  const doHighlight = router.query.commentId?.toString() === comment.id
  const [expanded, setExpanded] = useState(true)
  const [showReplyForm, setShowReplyForm] = useState(false)
  const commentRef = useRef(null)
  function toggleCollapsed() {
    setExpanded((prev) => !prev)
    if (!isElementInViewport(commentRef.current)) {
      // If I click on a collapse-line, but the top of the comment is above the top of the screen
      // console.log('Comment is out of view, scroll up to it.')
      commentRef.current.scrollIntoView()
    }
  }
  // console.log('Render comment')
  if (!expanded) {
    return (
      <div className="comment collapsed" id={comment.id} ref={commentRef} onClick={toggleCollapsed}>
        <div className="collapse">
          <FontAwesomeIcon icon={['fas', 'plus-square']} />
          <div className="collapse-line"></div>
        </div>
        <div className="elements-wrapper">
          <h2 className="username">{comment.author.username}</h2>
          {/* + 14 replies */}
        </div>
      </div>
    )
  }
  return (
    <div className={`comment ${doHighlight ? "highlight" : ""}`} id={comment.id} ref={commentRef}>
      <div className="collapse" onClick={toggleCollapsed}>
        <FontAwesomeIcon icon={['fas', 'minus-square']} />
        <div className="collapse-line"></div>
      </div>
      <div className="elements-wrapper">
        <h2 className="username">{comment.author.username}</h2>
        <div className="body" dangerouslySetInnerHTML={{ __html: comment.body }} />
        <div className="footer">
          {/* <button>
            <FontAwesomeIcon icon={['fas', 'arrow-up']} />
            {comment.upvoters.length}
          </button> */}
          {/* <button>
            <FontAwesomeIcon icon={['fas', 'arrow-down']} />
            {comment.downvotes}
          </button> */}
          <button onClick={() => setShowReplyForm((prev) => !prev)}>Reply</button>
          {/* <button>Edit</button> */}
          {/* <button>Delete</button> */}
        </div>
        {showReplyForm && <CommentForm post={post} parent={comment} setComments={setComments} setShowReplyForm={setShowReplyForm} />}
        <div className="replies">
          {comment.children?.map((reply) => (
            <Comment key={reply.id} comment={reply} post={post} setComments={setComments} />
          ))}
        </div>
      </div>
    </div>
  )
}

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    // rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) /* or $(window).height() */ &&
    rect.top + 30 <= (window.innerHeight || document.documentElement.clientHeight) /* or $(window).height() */ &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
  )
}
