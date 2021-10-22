import DefaultHead from 'components/Layout/DefaultHead'
import Header from './Header'
import Sidebar from 'components/Layout/Sidebar'

export default function Layout({ children, sidebarChildren }) {
  return (
    <>
      <DefaultHead />
      <Header />
      <div className="layout">
        <Sidebar>{sidebarChildren}</Sidebar>
        <div className="content">{children}</div>
      </div>
    </>
  )
}
