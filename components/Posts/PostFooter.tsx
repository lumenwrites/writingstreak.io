import { useRouter } from 'next/router'
import Link from 'components/Elements/Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useState, useEffect } from 'react'

import { useModal } from 'context/ModalContext'
import { useAuth } from 'context/AuthContext'

export default function PostFooter({ post }) {
  const router = useRouter()
  // When I'm viewing the post, I want clicking on tag to redirect to /
  let { postSlug, ...baseQuery } = router.query
  let pathname = router.pathname
  if (postSlug) pathname = '/'

  const createdAt = new Date(post.createdAt)
  const date = `${createdAt.getFullYear()}-${createdAt.getMonth()}-${createdAt.getDate()}`
  return (
    <div className="post-footer">
      <div className="tags">
        {post.tags.map((tag) => (
          <a
            className="tag"
            key={tag.slug}
            onClick={() => router.push({ query: { ...baseQuery, tag: tag.slug }, pathname })}
          >
            {tag.name}
          </a>
        ))}
        {/* {post.tags.map((tag) => (
          <Link className="tag" key={tag.slug} href={`/tag/${tag.slug}`}>
            {tag.name}
          </Link>
        ))} */}
        <div className="right">
          {/* <div className="tag">
            <FontAwesomeIcon icon={['fas', 'calendar']} />
            {date}
          </div> */}
          <Link className="tag" href="[...username]" as={`@${post.author.username}`}>
          {/* href={`/@${post.author.username}`} className="tag"> */}
            <FontAwesomeIcon icon={['fas', 'user']} />
            {post.author.username}
          </Link>
          <UpvoteButton post={post} />
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

function UpvoteButton({ post }) {
  const { toggleModal } = useModal()
  const { user } = useAuth()
  const [hasUpvoted, setHasUpvoted] = useState(false)
  const [score, setScore] = useState(post.upvoters.length)
  // Wait for user to get fetched, and only then check if he's one of the post's upvoters
  useEffect(() => {
    if (user?.username) {
      const hasUpvoted = post.upvoters?.find((u) => u.username === user?.username)
      setHasUpvoted(hasUpvoted ? true : false)
    }
  }, [user])
  async function handleUpvote(e) {
    if (!user?.username) return toggleModal(`login`)
    setHasUpvoted((upvoted) => {
      if (upvoted) setScore(score - 1)
      if (!upvoted) setScore(score + 1)
      return !upvoted
    })
    const { data } = await axios.post('/api/posts/upvote', { slug: post.slug })
  }
  return (
    <button className={`tag upvote ${hasUpvoted ? 'upvoted' : ''}`} onClick={handleUpvote}>
      <FontAwesomeIcon icon={['fas', 'arrow-up']} />
      {score}
    </button>
  )
}
