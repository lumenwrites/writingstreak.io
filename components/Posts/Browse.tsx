// @ts-nocheck
import PostCard from 'components/Posts/PostCard'


const Browse = ({ posts }) => {
  if (posts.length === 0) {
    return (
      <div className="no-results">
        <div className="flex-center">No posts here yet.</div>
      </div>
    )
  }
  return (
    <div className="post-grid">
      {posts.map((post, i) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  )
}

export default Browse
