import { useSidebar } from 'context/SidebarContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Sidebar({ children }) {
  const { isOpen, toggleSidebar } = useSidebar()
  // console.log("[Sidebar] isOpen", isOpen)
  return (
    <>
      <div className={`sidebar-collapsible sidebar-left ${isOpen ? 'open' : ''}`}>
        {children}
      </div>
      <div className={`dark-bg ${isOpen ? 'open' : ''}`} onClick={toggleSidebar} />
    </>
  )
}

export function ToggleSidebarButton() {
  const { isOpen, toggleSidebar } = useSidebar()
  if (isOpen) {
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
