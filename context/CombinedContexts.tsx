import { SidebarContextProvider } from 'context/SidebarContext'
import { ModalContextProvider } from 'context/ModalContext'
import { NotificationContextProvider } from 'context/NotificationContext'

export default function CombinedContextsProvider({ children }) {
  return (
    <NotificationContextProvider>
      <SidebarContextProvider>
        <ModalContextProvider>{children}</ModalContextProvider>
      </SidebarContextProvider>
    </NotificationContextProvider>
  )
}
