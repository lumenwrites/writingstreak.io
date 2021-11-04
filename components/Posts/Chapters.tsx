//@ts-nocheck
import { useRouter } from 'next/router'
import Link from 'components/Elements/Link'
import config from 'config.json'

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
  const [courseSlug, sectionSlug, chapterSlug] = router.query.slug
  // const chapters = section.chapters.filter((chapter) => !chapter.draft)
  return (
    <div className="section">
      <div className="section-title">{section.title}</div>
      {section.chapters.map((chapter) => {
        const isActive = section.slug === sectionSlug && chapter.slug === chapterSlug
        return (
          <Link key={chapter.url} className={`chapter ${isActive ? 'active' : ''}`} href={chapter.url}>
            {chapter.title}
            {chapter.draft && <div className="draft">Draft</div>}
            {chapter.preview && !user && config.price !== 0 && <div className="preview">Free Preview</div>}
          </Link>
        )
      })}
    </div>
  )
}
