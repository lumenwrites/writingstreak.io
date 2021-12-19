import { useState } from 'react'

export default function Tabs({ tabs, open=0, children }) {
  const [activeTab, setActiveTab] = useState(open)
  return (
    <div>
      <div className="tabs">
        {tabs.map((tabTitle, idx) => (
          <button key={tabTitle} className={`tab ${activeTab === idx ? 'active':''}`} onClick={() => setActiveTab(idx)}>
            {tabTitle}
          </button>
        ))}
      </div>
      {children[activeTab]}
    </div>
  )
}
