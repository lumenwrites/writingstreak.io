import CommentForm from './CommentForm'
import Comment from './Comment'

export default function Comments({ post }) {
  return (
    <div className="comments">
      <h2>Comments</h2>
      <CommentForm post={post} parent={null} />
      {post.comments.map((comment) => (
        <Comment key={comment.id} comment={comment} post={post} />
      ))}
    </div>
  )
}
