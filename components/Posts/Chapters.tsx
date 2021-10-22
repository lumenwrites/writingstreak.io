//@ts-nocheck
import { useRouter } from 'next/router'
import Link from 'components/Elements/Link'

export default function Chapters({ sections }) {
  return (
    <div className="chapters">
      {sections.map((section) => (
        <Section key={section.slug} section={section} />
      ))}
    </div>
  )
}

function Section({ section }) {
  const router = useRouter()
  const [sectionSlug, chapterSlug] = router.query.slug
  console.log(sectionSlug, chapterSlug)

  return (
    <div className="section">
      <div className="section-title">{section.title}</div>
      {section.chapters.map((chapter) => {
        const isActive = section.slug === sectionSlug && chapter.slug === chapterSlug
        return (
          <Link key={chapter.url} className={`chapter ${isActive ? "active" : ""}`} href={chapter.url}>
            {chapter.title}
            <div className="preview">Free Preview</div>
          </Link>
        )
      })}
    </div>
  )
}
