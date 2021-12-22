import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'components/Elements/Link'

export default function PrevNext({ post }) {
  return (
    <div className="prev-next">
      {post.prev ? (
        <Link className="prev" href={post.prev.url}>
          <FontAwesomeIcon icon={['fas', 'chevron-left']} />
          {post.prev.title}
        </Link>
      ): <div className="blank"/>}
      {post.next ? (
        <Link className="next" href={post.next.url}>
          <FontAwesomeIcon icon={['fas', 'chevron-right']} />
          {post.next.title}
        </Link>
      ) : <div className="blank"/>}
      <div className="clearfix" />
    </div>
  )
}
