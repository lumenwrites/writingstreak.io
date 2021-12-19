import axios from 'axios'
import moment from 'moment'
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RoundProgressBar from 'components/Elements/RoundProgressBar'
import { useEditorContext } from 'components/Editor/Editor'
import { generateTimeline, largeNumberFormat } from './utils'

export default function Timeline() {
  const { editorValues, setValue, setValues } = useEditorContext()
  useEffect(() => {
    // Scroll when timeline changes
    document.getElementById('timeline').scrollLeft = 99999
  }, [editorValues])
  // Days are fetched in edit.tsx and create.tsx, passed down here through the editor context
  const timeline = generateTimeline(editorValues.days)
  /* Render currently open doc's stats in place of it's date */
  const timelineWithCurrentDayStats = timeline.map((d) => {
    if (d.date === moment().format('YYYY-MM-DD')) {
      return { ...d, wordCount: editorValues.wordCount, writingTime: editorValues.writingTime }
    } else {
      return d
    }
  })
  return (
    <div className="timeline-with-fade">
      <div className="fade" />
      <div className="timeline" id="timeline">
        <div className="days-wrapper">
          {timelineWithCurrentDayStats.map((day) => (
            <Day key={day.date} day={day} />
          ))}
        </div>
      </div>
    </div>
  )
}

function Day({ day }) {
  const progress = day.wordCount / 250
  const isBlank = day.wordCount === 0 && day.writingTime === 0
  return (
    <div
      className="day"
      data-multiline={true}
      data-place="left"
      data-tip={
        `You wrote ${day.wordCount} words (${Math.floor(progress*100)}% of your daily goal),<br/>` +
        `and completed ${day.writingTime} minutes of focused writing. `
      }
    >
      <div className="day-name-date">
        <RoundProgressBar progress={progress * 100}>
          <div className="name-date">
            <div className="name">{day.weekday}</div>
            <div className="date">{day.date.slice(-2)}</div>
          </div>
        </RoundProgressBar>
      </div>
      {!isBlank && (
        <div className="day-stats">
          <div className="stat">
            <FontAwesomeIcon icon={['fas', 'pen-square']} />
            {largeNumberFormat(day.wordCount, 1)}
          </div>
          <div className="stat">
            <FontAwesomeIcon icon={['fas', 'clock']} />
            {day.writingTime}
          </div>
        </div>
      )}
    </div>
  )
}
