// @ts-nocheck
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'components/Elements/Link'

export function PostCard({ post }) {
  const showFooter = post.tags.length || post.comments
  return (
    <div className={`post-card ${!showFooter ? 'no-tags' : ''}`}>
      <div className="description">
        <Link className="title" href={post.url}>
          {post.title}
        </Link>
        <div className="summary">{post.description}</div>
      </div>
      {/* Footer */}
      {showFooter ? (
        <div className="post-footer">
          <div className="tags">
            {post.tags.map((tag) => (
              <Link className="tag" key={tag.slug} href={`/tag/${tag.slug}`}>
                {tag.name}
              </Link>
            ))}
            {post.comments && (
              <a href={post.comments} className="tag post-comments" target="_blank" rel="noopener noreferrer">
                {post.comments.includes('twitter') ? (
                  <FontAwesomeIcon icon={['fab', 'twitter']} />
                ) : (
                  <FontAwesomeIcon icon={['fas', 'comment-alt']} />
                )}
                Comments
              </a>
            )}
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
