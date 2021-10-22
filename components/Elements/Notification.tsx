import { useNotification } from 'context/NotificationContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'

export default function Notification() {
  const { notification, setNotification } = useNotification()
  const [isFading, setFading] = useState(false)
  // console.log(`notification: "${notification}". Is fading: ${isFading}.`)
  useEffect(() => {
    // Start fading only when there's a notification, and it's not already fading
    if (!notification || isFading) return
    setTimeout(() => { setFading(true) }, 3000)
    setTimeout(() => { reset() }, 3250)
  }, [notification])

  function reset() {
    setFading(false)
    setNotification('')
  }

  if (!notification) return <></>

  return (
    <div className={`notification ${isFading ? 'fade' : ''}`}>
      {notification}
      <div className="close-button" onClick={reset}>
        <FontAwesomeIcon icon={['fas', 'times']} />
      </div>
    </div>
  )
}
