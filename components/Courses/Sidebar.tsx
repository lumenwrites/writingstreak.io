import { useSidebar } from './CourseLayout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Sidebar({ children }) {
  const { sidebarIsOpen, toggleSidebar } = useSidebar()
  // console.log("[Sidebar] isOpen", isOpen)
  return (
    <>
      <div className={`sidebar ${sidebarIsOpen ? 'open' : ''}`}>
        {children}
      </div>
      <div className={`dark-bg ${sidebarIsOpen ? 'open' : ''}`} onClick={toggleSidebar} />
    </>
  )
}

export function ToggleSidebarButton() {
  const { sidebarIsOpen, toggleSidebar } = useSidebar()
  if (sidebarIsOpen) {
    return (
      <div className="toggle-sidebar-button" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={['fas', 'times']} />
      </div>
    )
  } else {
    return (
      <div className="toggle-sidebar-button" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={['fas', 'bars']} />
      </div>
    )
  }
}
