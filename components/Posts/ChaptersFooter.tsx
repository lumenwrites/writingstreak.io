import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'components/Elements/Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Chapters({ chapters, toc }) {
  const router = useRouter()
  return (
    <div className="chapters-footer">
        {chapters.map((chapter) => {
          let link = `/course/${chapter.courseSlug}/${chapter.chapterSlug}`
          if (chapter.chapterSlug === '_index') link = `/course/${chapter.courseSlug}`
          let isActive = router.query.chapterSlug === chapter.chapterSlug
          if (!router.query.chapterSlug && chapter.chapterSlug === '') isActive = true
          // console.log(router.query.chapterSlug, chapter.chapterSlug, isActive)
          return (
            <Link
              key={chapter.chapterSlug}
              className={`chapter-link ${isActive ? 'active' : ''}`}
              href={link}>
              {chapter.title}
            </Link>
          )
        })}
    </div>
  )
}

// Chapters dropdown
// export default function Chapters({ chapters, toc }) {
//   const router = useRouter()
//   return (
//     <div className="dropdown chapters-footer">
//       <span className="menu-handle btn right">Chapters</span>
//       <div className="menu">
//         {chapters.map((chapter) => {
//           let link = `/course/${chapter.courseSlug}/${chapter.chapterSlug}`
//           if (chapter.chapterSlug === '_index') link = `/course/${chapter.courseSlug}`
//           let isActive = router.query.chapterSlug === chapter.chapterSlug
//           if (!router.query.chapterSlug && chapter.chapterSlug === '') isActive = true
//           // console.log(router.query.chapterSlug, chapter.chapterSlug, isActive)
//           return (
//             <Link
//               key={chapter.chapterSlug}
//               className={`btn item chapter-link ${isActive ? 'active' : ''}`}
//               href={link}>
//               {chapter.title}
//             </Link>
//           )
//         })}
//       </div>
//     </div>
//   )
// }
