import axios from 'axios'
import moment from 'moment'
import { useState, useEffect, useRef } from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'
// import 'react-calendar-heatmap/dist/styles.css'
import { useAuth } from 'context/AuthContext'
import { useRouter } from 'next/router'
import { generateTimeline, largeNumberFormat } from './utils'
import { capitalize } from 'utils/textUtils'
import ReactTooltip from 'react-tooltip'

export default function Heatmap() {
  const router = useRouter()
  const [days, setDays] = useState([])
  async function fetchStats() {
    const { username } = router.query
    const { data } = await axios.post('/api/stats/get-days', { username })
    setDays(data.days)
    ReactTooltip.rebuild()
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
        endDate={moment().subtract(0, 'days')}
        startDate={moment().subtract(1, 'years')}
        showOutOfRangeDays={false}
        classForValue={valueToClass}
        tooltipDataAttrs={valueToTooltip}
      />
    </div>
  )
}

function valueToTooltip(value) {
  if (!value.date) return null // for out fo range days
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
  if (!value) return null // for out fo range days
  var className = ''
  const { wordCount, targetWordCount } = value
  if (wordCount > targetWordCount) {
    className += 'win '
  }
  if (wordCount) {
    className += 'wrote '
  }
  /* Turn 0-1000 into 0-10 for 10 classes */
  const brightness = wordCount < 2000 ? Math.floor(wordCount / 200) : 10
  className += `brightness-${brightness}`
  return className
}
