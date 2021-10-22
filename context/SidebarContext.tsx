import { createContext, useState } from "react"
import { useContext } from 'react'

const SidebarContext = createContext({
  isOpen: false,
  toggleSidebar: () => {},
})

export function useSidebar() {
  return useContext(SidebarContext)
}

export function SidebarContextProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  
  function toggleSidebar() {
    setIsOpen(prev => !prev)
  }
  const context = { isOpen, toggleSidebar }
  
  return (
    <SidebarContext.Provider value={context}>{children}</SidebarContext.Provider>
  )
}
export default SidebarContext
