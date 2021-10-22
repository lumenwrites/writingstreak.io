import { createContext, useState } from 'react'
import { useContext } from 'react'

const NotificationContext = createContext({
  notification: null,
  setNotification: (notification) => {},
})

export function useNotification() {
  return useContext(NotificationContext)
}

export function NotificationContextProvider({ children }) {
  const [notification, setNotification] = useState('')

  const context = { notification, setNotification }

  return <NotificationContext.Provider value={context}>{children}</NotificationContext.Provider>
}

export default NotificationContext
