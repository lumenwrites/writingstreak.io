import axios from 'axios'
import moment from 'moment'
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RoundProgressBar from 'components/Elements/RoundProgressBar'
import { useEditorInfo } from 'context/EditorContext'
import { generateTimeline } from './utils'

export default function Timeline() {
  const { editorInfo } = useEditorInfo()
  const [timeline, setTimeline] = useState([])
  // On first load, fetch saved days, generate 30 day timeline
  async function fetchStats() {
    const { data } = await axios.get('/api/stats/get-days')
    console.log('savedDays', data.days)
    setTimeline(generateTimeline(data.days))
    return data.days
  }
  useEffect(() => {
    fetchStats()
  }, [])
  // Scroll when timeline changes
  useEffect(() => {
    document.getElementById('timeline').scrollLeft = 99999
  }, [timeline])
  console.log('timeline', timeline)
  /* Render currently open doc's stats in place of it's date */
  const timelineWithCurrentDayStats = timeline.map((d) => {
    return d
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
      <div className="day-stats">
        <div className="stat">
          <FontAwesomeIcon icon={['fas', 'pen-square']} />
          {day.wordCount}
        </div>
        <div className="stat">
          <FontAwesomeIcon icon={['fas', 'clock']} />
          {day.writingTime}
        </div>
      </div>
    </div>
  )
}