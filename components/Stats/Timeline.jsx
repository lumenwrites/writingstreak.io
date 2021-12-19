import axios from 'axios'
import moment from 'moment'
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RoundProgressBar from 'components/Elements/RoundProgressBar'
import { useEditorContext } from 'components/Editor/Editor'
import { generateTimeline, largeNumberFormat } from './utils'
import { calculateStreak, calculateHabitStrength } from './utils'

export default function Timeline() {
  const { editorValues, setValue, setValues } = useEditorContext()
  const [timeline, setTimeline] = useState([])

  async function fetchStats() {
    // On first load, fetch saved days, generate 30 day timeline
    const { data } = await axios.post('/api/stats/get-days', { numberOfDays: 31 })
    setTimeline(generateTimeline(data.days))
    // console.log('Fetched days', data.days)
    if (!data.days.length) return
    const lastDay = data.days[0]
    if (moment().format('YYYY-MM-DD') === lastDay.date) {
      // console.log("Loading today's stats into state", lastDay.date)
      const { targetWordCount, wordCount, writingTime } = lastDay
      setValues((prev) => ({
        ...prev,
        targetWordCount,
        wordCount,
        writingTime,
      }))
    }

    const prefs = {
      writingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    }
    const streak = calculateStreak(data.days, prefs)
    const { habitStrength, completedDays } = calculateHabitStrength(data.days, prefs)
    setValues((prev) => ({ ...prev, streak, habitStrength, completedDays }))

    return data.days
  }
  useEffect(() => {
    fetchStats()
  }, [])
  // Scroll when timeline changes
  useEffect(() => {
    document.getElementById('timeline').scrollLeft = 99999
  }, [timeline, editorValues])
  /* Render currently open doc's stats in place of it's date */
  const timelineWithCurrentDayStats = timeline.map((d) => {
    if (d.date === moment().format('YYYY-MM-DD')) {
      return { ...d, wordCount: editorValues.wordCount, writingTime: editorValues.writingTime, active: true }
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
    <div className="day">
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
