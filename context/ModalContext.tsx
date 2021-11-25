import { createContext, useState } from "react"
import { useContext } from 'react'

// Data I want to pass through the component tree
// Actual functions are defined below, this is just for typescript autofill (?)
const ModalContext = createContext({
  modal: null,
  toggleModal: (modalName) => {},
})
export function useModal() {
  return useContext(ModalContext)
}
// Wrap it around components that should have access to this context
export function ModalContextProvider({ children }) {
  // This hook is used to actually save the modal state and change it
  const [modal, setModal] = useState("login1") //  subscribe
  
  function toggleModal(modalName) {
    if (modal === modalName) {
      setModal(null)
    } else {
      setModal(modalName)
    }
  }
  // Context passes the modal state and the function to change it down to the components
  // Login button in header toggles it on, close button on modal toggles it off.
  const context = {
    modal: modal,
    toggleModal: toggleModal
  }
  // Wrap the children into the context
  return (
    <ModalContext.Provider value={context}>{children}</ModalContext.Provider>
  )
}
export default ModalContext
