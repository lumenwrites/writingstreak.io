import moment from 'moment'

export function dateToWeekday(date) {
  var names = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  return names[date.isoWeekday() - 1]
}

export function dateToMonth(date) {
  var month = parseInt(moment(date).format('MM'))
  var names = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'November', 'December']
  return names[month - 1]
}

function generateEmptyDays(numberOfDays = 30) {
  const end = moment() // today
  const start = moment().subtract(numberOfDays, 'days') // 30 days ago
  const days = []
  for (var d = start; start.diff(end, 'days') <= 0; d.add(1, 'days')) {
    days.push({
      date: d.format('YYYY-MM-DD'),
      weekday: dateToWeekday(d),
      wordCount: 0,
      targetWordCount: 100, // doesn't matter what it is
      writingTime: 0,
    })
  }
  return days
}

/* Load saved days into calendar */
export function generateTimeline(savedDays, numberOfDays = 30) {
  const emptyDays = generateEmptyDays(numberOfDays) // last 30 days to render
  let timeline = []
  for (let emptyDay of emptyDays) {
    const savedDay = savedDays.find(d => d.date === emptyDay.date)
    if (savedDay) {
      timeline.push(savedDay)
    } else {
      timeline.push(emptyDay)
    }
  }
  return timeline
}
