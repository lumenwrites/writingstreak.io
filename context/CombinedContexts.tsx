import { ModalContextProvider } from 'context/ModalContext'
import { NotificationContextProvider } from 'context/NotificationContext'
import { AuthContextProvider } from 'context/AuthContext'

export default function CombinedContextsProvider({ children }) {
  return (
    <AuthContextProvider>
      <NotificationContextProvider>
        <ModalContextProvider>{children}</ModalContextProvider>
      </NotificationContextProvider>
    </AuthContextProvider>
  )
}
