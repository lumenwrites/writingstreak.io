import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

export default function OldNotification() {
  const hasBeenClosed = localStorage.getItem('closed-old-notification') ? true : false
  const [closed, setClosed] = useState(hasBeenClosed)
  function close() {
    setClosed(true)
    localStorage.setItem('closed-old-notification', 'true')
  }
  if (closed || window.location.pathname !== '/') return null
  return (
    <div className="old-notification">
      {/* <div className="wrapper"> */}
        This is a new and updated version of Writing Streak. You can still access the old app{' '}
        <a href="https://old.writingstreak.io" target="_blank" rel="noopener noreferrer">
          here
        </a>
        .
        <button className="close-button" onClick={close}>
          <FontAwesomeIcon icon={['fas', 'times']} />
        </button>
      {/* </div> */}
    </div>
  )
}
