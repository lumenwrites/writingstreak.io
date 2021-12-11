import { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RoundProgressBar from 'components/Elements/RoundProgressBar'
import { useEditorInfo } from 'context/EditorContext'
// Prefs
const { sprintDuration, sprintPace } = { sprintDuration: 60, sprintPace: 'Medium' }
const paces = { None: 0, Slow: 0.15, Medium: 0.7, Fast: 1.2 }
const pace = paces[sprintPace]

export default function Timer() {
  const { editorInfo, setEditorInfo } = useEditorInfo()
  // const [secondsLeft, setSecondsLeft] = useState(0)
  // const [healthLeft, setHealthLeft] = useState(100)
  const timer = useRef(null)

  function startTimer() {
    setEditorInfo((prev) => ({ ...prev, secondsLeft: sprintDuration }))
    setEditorInfo((prev) => ({ ...prev, healthLeft: 100 }))
    /* Start countdown */
    timer.current = setInterval(() => {
      setEditorInfo((prev) => {
        const updatedSecondsLeft = prev.secondsLeft - 0.1
        const updatedHealthLeft = prev.healthLeft - pace
        if (updatedSecondsLeft < 0.1) {
          console.log('Sprint complete')
          stopTimer()
          setEditorInfo((prev) => ({ ...prev, writingTime: prev.writingTime + Math.floor(sprintDuration / 60) }))
        }
        if (updatedHealthLeft < 0.1) {
          console.log('Sprint lost')
          stopTimer()
        }
        return { ...prev, secondsLeft: updatedSecondsLeft, healthLeft: updatedHealthLeft }
      })
    }, 100)
  }

  function stopTimer() {
    clearInterval(timer.current)
    setEditorInfo((prev) => ({ ...prev, secondsLeft: 0, healthLeft: 100 }))
  }

  const minutes = Math.floor(editorInfo.secondsLeft / 60)
    .toString()
    .padStart(2, '0')
  const seconds = (Math.floor(editorInfo.secondsLeft) - minutes * 60).toString().padStart(2, '0')
  let progress = 1
  if (editorInfo.secondsLeft) progress = editorInfo.secondsLeft / sprintDuration
  return (
    <>
      <HealthBar progress={editorInfo.healthLeft} />
      <div className="timer">
        <RoundProgressBar progress={progress * 100}>
          {editorInfo.secondsLeft > 0 ? (
            <div className="time">
              <div className="minutes-seconds">
                {minutes}:{seconds}
              </div>
              <div className="stop" onClick={stopTimer}>
                <FontAwesomeIcon icon={['fas', 'stop']} />
              </div>
            </div>
          ) : (
            <div className="play" onClick={startTimer}>
              <FontAwesomeIcon icon={['fas', 'play']} transform="right-2" />
            </div>
          )}
        </RoundProgressBar>
      </div>
    </>
  )
}

function HealthBar({ progress }) {
  let fill = Math.floor(progress)
  if (fill === 0) fill = 100
  if (sprintPace === 'None') {
    return null //<div className="healthbar-placeholder" />
  }
  return (
    <div className="healthbar">
      <div className="progress" style={{ height: `${fill}%` }}>
        <FontAwesomeIcon icon={['fas', 'heart']} />
      </div>
    </div>
  )
}
