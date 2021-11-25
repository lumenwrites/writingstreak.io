import Header from './Header'

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
