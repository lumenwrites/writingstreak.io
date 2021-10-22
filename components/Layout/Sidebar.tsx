import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'components/Elements/Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Sidebar({ children }) {
  const router = useRouter()
  const [isOpen, setOpen] = useState(false)
  // console.log("[Sidebar] isOpen", isOpen)
  return (
    <>
      <div className={`sidebar-collapsible sidebar-left ${isOpen ? 'open' : ''}`}>
        <div className="open-button" onClick={() => setOpen((prev) => !prev)}>
          <FontAwesomeIcon icon={['fas', 'bars']} />
        </div>
        <div className="close-button" onClick={() => setOpen((prev) => !prev)}>
          <FontAwesomeIcon icon={['fas', 'times']} />
        </div>
        <div className="children">{children}</div>
      </div>
      <div className={`dark-bg ${isOpen ? 'open' : ''}`} onClick={() => setOpen((prev) => !prev)} />
    </>
  )
}
