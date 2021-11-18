// @ts-nocheck
import Link from 'components/Elements/Link'

export function PostCard({ post }) {
  return (
    <div className={`post-card ${post.tags.length == 0 ? 'no-tags' : ''}`}>
      <div className="description">
        <Link className="title" href={post.url}>
          {post.title}
        </Link>
        <div className="summary">{post.description}</div>
      </div>
      {/* Footer */}
      {post.tags.length ? (
        <div className="post-footer">
          <div className="tags">
            {post.tags.map((tag) => (
              <Link className="tag" key={tag.slug} href={`/tag/${tag.slug}`}>
                {tag.name}
              </Link>
            ))}
            {post.draft && <div className="tag draft">Draft</div>}
            <div className="clearfix" />
          </div>
        </div>
      ) : null}
    </div>
  )
}


const Browse = ({ posts }) => {
  // console.log(posts)
  if (posts.length === 0) {
    return (
      <div className="no-results">
        <div className="flex-center">No posts here yet.</div>
      </div>
    )
  }
  return (
    <div className="post-feed">
      {posts.map((post, i) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  )
}

export default Browse
