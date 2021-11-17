import Header from './Header'
import Sidebar from 'components/Layout/Sidebar'

export default function Layout({ children, subnav = null }) {
  return (
    <>
      <Header className="header" />
      {subnav}
      <div className="layout">
        <div className="content">{children}</div>
      </div>
    </>
  )
}
