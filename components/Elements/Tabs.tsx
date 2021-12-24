import slugify from 'slugify'
import { useState, useEffect } from 'react'

export default function Tabs({ tabTitles, children }) {
  const tabsWithSlugs = tabTitles.map((t) => ({ name: t, slug: slug(t) }))
  const [activeTab, setActiveTab] = useState(tabsWithSlugs[0]) // slug(tabs[0])
  useEffect(() => {
    if (window.location.hash) {
      const slug = window.location.hash.replace('#', '')
      selectTab(slug)
    }
  }, [])
  function selectTab(slug) {
    const activeTab = tabsWithSlugs.find((t) => t.slug === slug)
    setActiveTab(activeTab)
    window.location.hash = activeTab.slug
  }
  const index = tabsWithSlugs.findIndex(t => t.slug ===activeTab.slug);
  return (
    <div>
      <div className="tabs">
        {tabsWithSlugs.map((tab) => (
          <button
            key={tab.slug}
            className={`tab ${activeTab.slug === tab.slug ? 'active' : ''}`}
            onClick={() => selectTab(tab.slug)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      {children[index]}
    </div>
  )
}

function slug(str) {
  return slugify(str, { lower: true, strict: true })
}
