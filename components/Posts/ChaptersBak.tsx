import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'components/Elements/Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Chapters({ chapters, toc }) {
  const router = useRouter()
  const [isOpen, setOpen] = useState(false)
  // console.log('query', router.query.chapterSlug)
  console.log(isOpen)
  return (
    <>
      <div className="sidebar-button" onClick={() => setOpen(prev => !prev)}>
        <FontAwesomeIcon icon={['fas', 'bars']} />
      </div>
      <div className={`chapters ${isOpen ? 'open' : ''}`}>
        {chapters.map((chapter) => {
          let link = `/course/${chapter.courseSlug}/${chapter.chapterSlug}`
          if (chapter.chapterSlug === '_index') link = `/course/${chapter.courseSlug}`
          let isActive = router.query.chapterSlug === chapter.chapterSlug
          if (!router.query.chapterSlug && chapter.chapterSlug === '') isActive = true
          // console.log(router.query.chapterSlug, chapter.chapterSlug, isActive)
          return (
            <div key={chapter.chapterSlug} className={`chapter ${isActive ? 'active' : ''}`}>
              <Link className="chapter-link" href={link}>
                {chapter.title}
              </Link>
              {isActive && <Outline toc={toc} />}
            </div>
          )
        })}
      </div>
      <div className={`dark-bg ${isOpen ? 'open' : ''}`} onClick={() => setOpen(prev => !prev)} />
    </>
  )
}

function Outline({ toc }) {
  return (
    <div>
      {toc.map((item) => (
        <a key={item.slug} className={`toc-link`} href={`#${item.slug}`}>
          # {item.title}
        </a>
      ))}
    </div>
  )
}
