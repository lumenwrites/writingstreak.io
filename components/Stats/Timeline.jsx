import axios from 'axios'
import moment from 'moment'
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RoundProgressBar from 'components/Elements/RoundProgressBar'
import { useEditorInfo } from 'context/EditorContext'
import { generateTimeline, largeNumberFormat } from './utils'

export default function Timeline() {
  const { editorInfo, setEditorInfo } = useEditorInfo()
  const [timeline, setTimeline] = useState([])

  async function fetchStats() {
    // On first load, fetch saved days, generate 30 day timeline
    const { data } = await axios.get('/api/stats/get-days')
    setTimeline(generateTimeline(data.days))
    // console.log('Fetched days', data.days)
    if (!data.days.length) return
    const lastDay = data.days[0]
    if (moment().format('YYYY-MM-DD') === lastDay.date) {
      // console.log("Loading today's stats into state", lastDay.date)
      const { targetWordCount, wordCount, writingTime } = lastDay
      setEditorInfo((prev) => ({
        ...prev,
        targetWordCount,
        wordCount,
        writingTime,
      }))
    }

    return data.days
  }
  useEffect(() => {
    fetchStats()
  }, [])
  // Scroll when timeline changes
  useEffect(() => {
    document.getElementById('timeline').scrollLeft = 99999
  }, [timeline, editorInfo])
  /* Render currently open doc's stats in place of it's date */
  const timelineWithCurrentDayStats = timeline.map((d) => {
    if (d.date === moment().format('YYYY-MM-DD')) {
      return { ...d, wordCount: editorInfo.wordCount, writingTime: editorInfo.writingTime, active: true }
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
