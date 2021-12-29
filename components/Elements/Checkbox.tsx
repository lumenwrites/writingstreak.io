import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Checkbox({ children, checked, onClick }) {
  const [isChecked, setChecked] = useState(checked)
  function toggleCheckbox() {
    setChecked((prev) => {
      onClick(!prev)
      return !prev
    })
  }
  return (
    <div className="checkbox-wrapper">
      <div className={`checkbox ${isChecked ? 'checked' : ''}`} onClick={toggleCheckbox}>
        {isChecked && <FontAwesomeIcon icon={['fas', 'check']} />}
      </div>
      <div className="checkbox-description">{children}</div>
    </div>
  )
}
