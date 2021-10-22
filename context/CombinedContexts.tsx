import { ModalContextProvider } from 'context/ModalContext'
import { NotificationContextProvider } from 'context/NotificationContext'

export default function CombinedContextsProvider({ children }) {
  return (
    <NotificationContextProvider>
      <ModalContextProvider>{children}</ModalContextProvider>
    </NotificationContextProvider>
  )
}
