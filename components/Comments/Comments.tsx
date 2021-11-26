import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import CommentForm from './CommentForm'
import Comment from './Comment'

export default function Comments({ post }) {
  const router = useRouter()
  const [comments, setComments] = useState(post.comments)
  useEffect(() => {
    var comment = document.getElementById(router.query.commentId?.toString())
    comment?.scrollIntoView()
  }, [comments])
  return (
    <div className="comments" id="comments">
      <h2>Comments</h2>
      <CommentForm post={post} parent={null} setComments={setComments} />
      {processComments(comments).map((comment) => (
        <Comment key={comment.id} comment={comment} post={post} setComments={setComments} />
      ))}
    </div>
  )
}

// Flat comments to tree
function processComments(comments) {
  // console.log('Process comments', comments)
  let processedComments = []
  for (let comment of comments) {
    if (!comment.parentId) {
      processedComments.push(commentToTree(comment, comments))
    }
  }
  return processedComments
}

function commentToTree(parent, allComments) {
  parent.children = allComments.filter(c => c.parentId === parent.id)
  parent.children.map(child => commentToTree(child, allComments))
  return parent
}
