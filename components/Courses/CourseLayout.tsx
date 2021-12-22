import Header from 'components/Layout/Header'
import Sidebar from './Sidebar'
import { useState, useEffect, createContext, useContext } from 'react'

const SidebarContext = createContext({
  sidebarIsOpen: false,
  toggleSidebar: () => {},
})

export function useSidebar() {
  return useContext(SidebarContext)
}

export default function Layout({ children, sidebarChildren = [] }) {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false)
  function toggleSidebar() {
    setSidebarIsOpen((prev) => !prev)
  }

  return (
    <SidebarContext.Provider value={{ sidebarIsOpen, toggleSidebar }}>
      <Header className="course-header" />
      <div className="course-layout">
        <Sidebar>{sidebarChildren}</Sidebar>
        <div className="content">{children}</div>
      </div>
    </SidebarContext.Provider>
  )
}
