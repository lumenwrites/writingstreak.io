import Header from './Header'

import dynamic from 'next/dynamic'

const OldNotification = dynamic(() => import('../Elements/OldNotificaiton'), { ssr: false })

export default function Layout({ children, subnav = null }) {
  return (
    <>
      {/* <OldNotification/> */}
      <Header className="header" />
      {subnav}
      <div className="layout">
        <div className="content">{children}</div>
      </div>
    </>
  )
}
