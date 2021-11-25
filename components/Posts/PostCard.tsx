// @ts-nocheck
import Link from 'components/Elements/Link'
import PostFooter from './PostFooter'

export default function PostCard({ post }) {
  return (
    <div className="post-card">
      <div className="description">
        <Link className="title" href={`/post/${post.slug}`}>
          {post.title}
        </Link>
        <div className="summary">{post.description}</div>
      </div>
      <PostFooter post={post} />
    </div>
  )
}
