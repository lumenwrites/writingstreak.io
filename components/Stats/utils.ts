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
      targetWordCount: 100, // doesn't matter what it is
      wordCount: 0,
      writingTime: 0,
    })
  }
  return days
}

/* Load saved days into calendar */
export function generateTimeline(savedDays, numberOfDays = 30) {
  console.log(`Generating Timeline, loading ${savedDays.length} days into timeilne`)
  const emptyDays = generateEmptyDays(numberOfDays) // last 30 days to render
  let timeline = []
  for (let emptyDay of emptyDays) {
    const savedDay = savedDays.find(d => d.date === emptyDay.date)
    if (savedDay) {
      const weekday = dateToWeekday(moment(savedDay.date))
      timeline.push({ ...savedDay, weekday })
    } else {
      timeline.push(emptyDay)
    }
  }
  return timeline
}


// Number formatter
// https://stackoverflow.com/questions/9461621/format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900
export function largeNumberFormat(num, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function(item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}
