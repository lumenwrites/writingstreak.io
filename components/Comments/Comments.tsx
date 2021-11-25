import { useAuth } from 'context/AuthContext'
import { useModal } from "context/ModalContext"
import CommentForm from './CommentForm'
import Comment from './Comment'

export default function Comments({ post }) {
  const { toggleModal } = useModal()
  const { user } = useAuth()
  return (
    <div className="comments">
      <h2>Comments</h2>
      {user ? (
        <CommentForm />
      ) : (
        <div>
          <a className="link-cta" onClick={() => toggleModal(`login`)}>Join or Login</a> to comment.
        </div>
      )}
      {post.comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  )
}
