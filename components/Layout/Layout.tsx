import Header from './Header'
import Sidebar from 'components/Layout/Sidebar'

export default function Layout({ children, sidebarChildren }) {
  return (
    <>
      <Header />
      <div className="layout">
        <Sidebar>{sidebarChildren}</Sidebar>
        <div className="content">{children}</div>
      </div>
    </>
  )
}
