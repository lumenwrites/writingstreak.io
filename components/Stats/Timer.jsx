import { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RoundProgressBar from 'components/Elements/RoundProgressBar'
import { useEditorContext } from 'components/Editor/Editor'

// Prefs
// Pace = How much HP I lose every second = how many characters per second I have to type.
// Each keystroke adds 2hp, average English word length is 5 characters, so each word adds 10hp.
// WPS = (pace characters/second) / (10 characters/word)
// WPM = WPS*60 = (pace / 10) * 60
// pace = (WPM / 60) * 10
// Slow       = (10 WPM / 60) * 10 = 1.66
// Medium     = (30 WPM / 60) * 10 = 5
// Fast       = (50 WPM / 60) * 10 = 8.3
// Very Fast  = (70 WPM / 60) * 10 = 11.5
// There are 100 hitpoints in a healthbar(buffer). So you lose the sprint in
// Healthbar time = 100 hitpoints / (pace hp/second) 
// Slow       = 100 / 1.66 = 60
// Medium     = 100 / 5 = 20
// Fast       = 100 / 8.2 = 12
// Very Fast  = 100 / 11.5 = 8
const paces = { None: 0, Slow: 1.6, Medium: 5, Fast: 8.2, "Very Fast": 11.5 }


export default function Timer() {
  const { editorValues, setValue, setValues } = useEditorContext()
  const timer = useRef(null)

  function startTimer() {
    setValue('secondsLeft', editorValues.sprintDuration * 60)
    setValue('healthLeft', 100)
    /* Start countdown */
    timer.current = setInterval(() => {
      setValues((prev) => {
        const updatedSecondsLeft = prev.secondsLeft - 1 * 0.1 // Multiplying by 0.1 because the timer runs 10 times per second
        const updatedHealthLeft = prev.healthLeft - paces[editorValues.sprintPace] * 0.1 // I'm running timer once per second now
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
    }, 100)
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
  // console.log('[timer render]', editorValues.healthLeft)
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
