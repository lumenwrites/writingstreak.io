import Header from './Header'
import Sidebar from 'components/Layout/Sidebar'

export default function Layout({ children, sidebarChildren = [] }) {
  return (
    <>
      <Header className="header" />
      <div className="layout">
        <div className="content">{children}</div>
      </div>
    </>
  )
}
