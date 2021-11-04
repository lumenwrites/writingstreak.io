import Link from 'components/Elements/Link'
import Image from 'next/image'
import slugify from 'slugify'

export default function PostCard({ post }) {
  return (
    <div className={`post-card ${post.tags.length == 0 ? 'no-tags' : ''}`}>
      <Link className="thumbnail" href={post.url}>
        <Image src={post.thumbnail} width={320} height={180} layout="responsive" />
      </Link>
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
            <div className="clearfix" />
          </div>
        </div>
      ) : null}
    </div>
  )
}
