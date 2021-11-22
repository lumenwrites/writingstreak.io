import CommentForm from './CommentForm'
import Comment from './Comment'
import { comments } from './commentsData'

export default function Comments() {
  return (
    <div className="comments">
      <h2>Comments</h2>
      <CommentForm />
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  )
}
