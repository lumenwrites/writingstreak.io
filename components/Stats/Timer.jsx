import { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RoundProgressBar from 'components/Elements/RoundProgressBar'
import { useEditorContext } from 'components/Editor/Editor'

// Prefs
const paces = { None: 0, Slow: 0.15, Medium: 0.5, Fast: 1 }

export default function Timer() {
  const { editorValues, setValue, setValues } = useEditorContext()
  const timer = useRef(null)

  function startTimer() {
    setValue('secondsLeft', editorValues.sprintDuration * 60)
    setValue('healthLeft', 100)
    /* Start countdown */
    timer.current = setInterval(() => {
      setValues((prev) => {
        const updatedSecondsLeft = prev.secondsLeft - 1 // -0.1 when I run every 100 ms
        const updatedHealthLeft = prev.healthLeft - paces[editorValues.sprintPace] * 10 // I'm running timer once per second now
        if (updatedSecondsLeft < 0.1) {
          console.log('Sprint complete')
          stopTimer()
          setValues((prev) => ({ ...prev, writingTime: prev.writingTime + Math.floor(editorValues.sprintDuration) }))
        }
        if (updatedHealthLeft < 0.1) {
          console.log('Sprint lost')
          stopTimer()
        }
        return { ...prev, secondsLeft: updatedSecondsLeft, healthLeft: updatedHealthLeft }
      })
    }, 1000)
  }

  function stopTimer() {
    clearInterval(timer.current)
    setValues((prev) => ({ ...prev, secondsLeft: 0, healthLeft: 100 }))
  }

  const minutes = Math.floor(editorValues.secondsLeft / 60)
    .toString()
    .padStart(2, '0')
  const seconds = (Math.floor(editorValues.secondsLeft) - minutes * 60).toString().padStart(2, '0')
  let progress = 1
  if (editorValues.secondsLeft) progress = editorValues.secondsLeft / (editorValues.sprintDuration * 60)
  console.log('[timer render]')
  return (
    <>
      <HealthBar />
      <div
        className="timer"
        data-place="left"
        data-multiline={true}
        data-tip={
          `Write without interruptions for ${editorValues.sprintDuration} minutes (until the time runs out). <br/>` +
          `You can edit the duration in the settings.`
        }
      >
        <RoundProgressBar progress={progress * 100}>
          {editorValues.secondsLeft > 0 ? (
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

function HealthBar() {
  const { editorValues, setValue, setValues } = useEditorContext()
  let fill = Math.floor(editorValues.healthLeft)
  if (fill === 0) fill = 100
  if (editorValues.sprintPace === 'None') {
    return <div className="healthbar-placeholder" />
  }
  return (
    <div
      className="healthbar"
      data-place="left"
      data-multiline={true}
      data-tip={
        `Remaining health. Increases as you type, decreases when you stop. <br/>` +
        `Change the speed or turn it off in the settings.`
      }
    >
      <div className="progress" style={{ height: `${fill}%` }}>
        <FontAwesomeIcon icon={['fas', 'heart']} />
      </div>
    </div>
  )
}
