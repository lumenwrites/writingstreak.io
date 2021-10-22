import DefaultHead from 'components/Layout/DefaultHead'
import Header from './Header'
import Notification from 'components/Elements/Notification'
import Footer from './Footer'
import SubscribeModal from 'components/Layout/SubscribeModal'
import Chapters from 'components/Posts/Chapters'
import Toc from 'components/Posts/Toc'

export default function Layout({ children }) {
  return (
    <>
      <DefaultHead />
      <Header />
      <div className="layout">
        <div className="content">{children}</div>
      </div>
      {/* <Footer /> */}
      <Notification />
      <SubscribeModal />
    </>
  )
}
