//@ts-nocheck
import { useRouter } from 'next/router'
import Link from 'components/Elements/Link'

export default function Chapters({ sections, user }) {
  return (
    <div className="chapters">
      {sections.map((section) => (
        <Section key={section.slug} section={section} user={user} />
      ))}
    </div>
  )
}

function Section({ section, user }) {
  const router = useRouter()
  const [sectionSlug, chapterSlug] = router.query.slug

  return (
    <div className="section">
      <div className="section-title">{section.title}</div>
      {section.chapters.map((chapter) => {
        const isActive = section.slug === sectionSlug && chapter.slug === chapterSlug
        return (
          <Link key={chapter.url} className={`chapter ${isActive ? 'active' : ''}`} href={chapter.url}>
            {chapter.title}
            {chapter.preview && !user && <div className="preview">Free Preview</div>}
          </Link>
        )
      })}
    </div>
  )
}
