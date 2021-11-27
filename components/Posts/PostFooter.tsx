import { useRouter } from 'next/router'
import Link from 'components/Elements/Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function PostFooter({ post }) {
  const router = useRouter()
  // When I'm viewing the post, I want clicking on tag to redirect to /
  let { postSlug, ...baseQuery } = router.query
  let pathname = router.pathname
  if (postSlug) pathname = '/'
  return (
    <div className="post-footer">
      <div className="tags">
        {post.tags.map((tag) => (
          <a className="tag" key={tag.slug} onClick={() => router.push({ query: { ...baseQuery, tag: tag.slug }, pathname })}>
            {tag.name}
          </a>
        ))}
        {/* {post.tags.map((tag) => (
          <Link className="tag" key={tag.slug} href={`/tag/${tag.slug}`}>
            {tag.name}
          </Link>
        ))} */}
        <div className="right">
          <Link href={`/${post.author.username}`} className="tag">
            <FontAwesomeIcon icon={['fas', 'user']} />
            {post.author.username}
          </Link>
          <a className="tag">
            <FontAwesomeIcon icon={['fas', 'arrow-up']} />
            {post.score}
          </a>
          <Link href={`/post/${post.slug}#comments`} className="tag" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={['fas', 'comment-alt']} />
            {post.comments.length}
          </Link>
        </div>

        <div className="clearfix" />
      </div>
    </div>
  )
}
