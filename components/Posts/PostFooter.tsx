import Link from 'components/Elements/Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function PostFooter({ post }) {
  return (
    <div className="post-footer">
      <div className="tags">
        {post.tags.map((tag) => (
          <Link className="tag" key={tag.slug} href={`/tag/${tag.slug}`}>
            {/* <FontAwesomeIcon icon={['fas', 'tag']} /> */}
            {tag.name}
          </Link>
        ))}
        {/* 
        <div className="right">
          <a className="tag">
            <FontAwesomeIcon icon={['fas', 'user']} />
            lumenwrites
          </a>
          <a className="tag">
            <FontAwesomeIcon icon={['fas', 'arrow-up']} />
            157
          </a>
           
          <a href={post.comments} className="tag" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={['fas', 'comment-alt']} />
            28
          </a>
        </div>
*/}
        <div className="clearfix" />
      </div>
    </div>
  )
}
