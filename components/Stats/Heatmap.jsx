import axios from 'axios'
import moment from 'moment'
import { useState, useEffect, useRef } from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'
// import 'react-calendar-heatmap/dist/styles.css'
import { useAuth } from 'context/AuthContext'
import { useRouter } from 'next/router'
import { generateTimeline, largeNumberFormat } from './utils'
import { capitalize } from 'utils/textUtils'

export default function Heatmap() {
  const router = useRouter()
  const [days, setDays] = useState([])
  async function fetchStats() {
    const { username } = router.query
    const { data } = await axios.post('/api/stats/get-days', { username })
    setDays(data.days)
  }
  useEffect(() => {
    fetchStats()
  }, [])

  if (!days?.length) return null
  const timeline = generateTimeline(days, 366)
  console.log('timeline', timeline)
  return (
    <div className="heatmap">
      <CalendarHeatmap
        values={timeline}
        endDate={moment().subtract(1, 'days')}
        startDate={moment().subtract(1, 'years')}
        showOutOfRangeDays={false}
        classForValue={valueToClass}
        tooltipDataAttrs={valueToTooltip}
      />
    </div>
  )
}

function valueToTooltip(value) {
  const dateName =
    `${capitalize(value.weekday)} ` +
    `${value.date.slice(-2)}, ` +
    `${moment(value.date).format('MMMM')} ` +
    `${value.date.substring(0, 4)}`
  const tip = `${dateName} <br/>` + `Words: ${value.wordCount || 0} <br/>` + `Minutes: ${value.writingTime} <br/>`
  return {
    'data-html': true,
    'data-place': 'right',
    'data-tip': tip,
  }
}

function valueToClass(value) {
  var className = ''
  const { wordCount, targetWordCount } = value
  if (wordCount > targetWordCount) {
    className += 'win '
  }
  if (wordCount && wordCount < targetWordCount) {
    console.log('not win')
  }
  /* Turn 0-1000 into 0-10 for 10 classes */
  const brightness = wordCount < 1000 ? Math.floor(wordCount / 100) : 10
  className += `brightness-${brightness}`
  return className
}
