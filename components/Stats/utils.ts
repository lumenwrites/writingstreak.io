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
      targetWordcount: 100, // doesn't matter what it is
      wordCount: 0,
      writingTime: 0,
    })
  }
  return days
}

export function loadTodayIntoSavedDays(editorValues) {
  let daysWithTodaysStats = [...editorValues.days]
  const today = {
    date: moment().format('YYYY-MM-DD'),
    wordCount: editorValues.wordCount,
    writingTime: editorValues.writingTime,
    targetWordcount: editorValues.targetWordcount,
  }
  if (today.date !== daysWithTodaysStats[0]?.date) {
    daysWithTodaysStats.unshift(today)
  } else {
    daysWithTodaysStats[0] = {...daysWithTodaysStats[0], ...today}
  }
  return daysWithTodaysStats
}

/* Load saved days into calendar */
export function generateTimeline(savedDays, numberOfDays = 30) {
  // console.log(`Generating Timeline, loading ${savedDays.length} days into timeilne`)
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


export function calculateStreak(days, writingDays) {
  // console.log('Calculating streak')
  var currentStreak = 0
  const start = moment()
  const end = moment().subtract(days.length, 'days')
  /* Loop backwards through dates */
  for (var d = start; start.diff(end, 'days') >= 0; d.subtract(1, 'days')) {
    const day = days.find(day => day.date == d.format('YYYY-MM-DD'))
    const wroteToday = day && day.wordCount >= day.targetWordcount
    const isToday = d.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')
    const isWritingDay = writingDays.some(wd => wd === dateToWeekday(d))
    // console.log(d.format('YYYY-MM-DD'), day, { wroteToday, isToday, currentStreak } )
    if (wroteToday) {
      currentStreak += 1
    } else {
      if (isWritingDay && !isToday) break // Missed a day, streak is over
      // if (isWritingDay && !isToday) return currentStreak // For some reason break doesn't work, have to use return
      // If it's not a writing day, it's fine to not write.
      // I don't increment the streak but I don't break it either.
    }
  }
  return currentStreak
}

export function calculateHabitStrength(days, writingDays) {
  var completedDays = 0
  const start = moment()
  const end = moment().subtract(30, 'days')
  var totalWritingDaysThisMonth = 0
  /* Loop backwards through dates */
  for (var d = start; start.diff(end, 'days') >= 0; d.subtract(1, 'days')) {
    const day = days.find(day => day.date == d.format('YYYY-MM-DD'))
    const wroteToday = day && day.wordCount > day.targetWordcount
    const isWritingDay = writingDays.some(wd => wd === dateToWeekday(d))
    if (wroteToday) {
      completedDays += 1
    }
    if (isWritingDay) {
      totalWritingDaysThisMonth += 1
    }
  }
  const habitStrength = (completedDays / totalWritingDaysThisMonth)
  // console.log('completedDays', completedDays)
  return { completedDays, habitStrength }
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
  var item = lookup.slice().reverse().find(function (item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}


export function countWritingDays(prefs) {
  let start = moment(prefs.startDate)
  let end = moment(prefs.endDate)
  let numberOfWritingDays = 0
  let daysPast = 0
  let daysLeft = 0
  /* Count total number of writing days, how many past, how many left. */
  for (var d = start; start.diff(end, 'days') <= 0; d.add(1, 'days')) {
    const isWritingDay = prefs.writingDays.some((wd) => wd === dateToWeekday(d))
    if (!isWritingDay) continue
    numberOfWritingDays += 1
    if (moment().diff(d) > 0) {
      daysPast += 1
    } else {
      daysLeft += 1
    }
  }
  return { numberOfWritingDays, daysPast, daysLeft }
}

export function generateStats(savedDays, prefs) {
  let totalWordsWritten = 0
  var start = moment(prefs.startDate)
  var end = moment(prefs.endDate)
  for (var d = start; start.diff(end, 'days') <= 0; d.add(1, 'days')) {
    const day = savedDays.find((day) => day.date == d.format('YYYY-MM-DD'))
    if (day) totalWordsWritten += day.wordCount
  }

  const { numberOfWritingDays, daysPast, daysLeft } = countWritingDays(prefs)
  const wordsLeftToWrite = Math.max(prefs.writingGoal - totalWordsWritten, 0)
  const intendedToWritePerDay = Math.ceil(prefs.writingGoal / Math.max(numberOfWritingDays, 1) ) // TODO - off by 1 error when there's 0 writing days inbetween
  const actuallyWrotePerDay = Math.floor(totalWordsWritten / daysPast)
  const shouldWritePerDayToSucceed = Math.floor(wordsLeftToWrite / daysLeft)
  const data = generateChartData(savedDays, prefs, intendedToWritePerDay)

  const stats = {
    writingGoal: prefs.writingGoal,
    totalWordsWritten,
    wordsLeftToWrite,
    intendedToWritePerDay,
    actuallyWrotePerDay,
    shouldWritePerDayToSucceed,
    daysPast, daysLeft,
    data
  }
  return stats
}

export function generateChartData(savedDays, prefs, intendedToWritePerDay) {
  var start = moment(prefs.startDate)
  var end = moment(prefs.endDate)
  let data = []
  // Adding up the total number of words that were written by this day (or should've been written)
  let actuallyWroteCounter = 0
  let intendedToWriteCounter = 0
  for (var d = start; start.diff(end, 'days') <= 0; d.add(1, 'days')) {
    let dataPoint = {
      name: `${dateToWeekday(d)} ${d.format('DD')}`, // Wed 13
      month: `${d.format('MMM DD')}` // Jan 23
    }
    // Intended to write chart. Goes up only on writing days, on weekends it's flat.
    const isWritingDay = prefs.writingDays.some((wd) => wd === dateToWeekday(d))
    if (isWritingDay) intendedToWriteCounter += intendedToWritePerDay
    dataPoint['Need to Write'] = intendedToWriteCounter
    // Actually wrote chart. If there's a saved day, add up the words I wrote.
    const day = savedDays.find((day) => day.date == d.format('YYYY-MM-DD'))
    if (day) actuallyWroteCounter += day.wordCount
    // Chart all the days up to and including today. + 1 to include today, off by 1 error.
    if (moment().diff(d, 'days') + 1 > 0) dataPoint['Actually Wrote'] = actuallyWroteCounter
    data.push(dataPoint)
  }
  return data
}

export function generateDescription(stats, prefs) {
  var description = `You wrote ${stats.totalWordsWritten} out of ${stats.writingGoal} words, `
  description += `${stats.wordsLeftToWrite} left to write. <br/> `
  const totalDaysLeft = moment(prefs.endDate).diff(moment(), 'days')

  if (stats.wordsLeftToWrite <= 0) {
    description += `You have completed your goal! Set a new one in settings.`
    return description
  }
  if (totalDaysLeft < 0 && stats.wordsLeftToWrite) {
    description += `Deadline has past. Set a new goal in settings. `
    return description
  }
  if (stats.daysLeft == 0) {
    description += `Deadline is today! `
  }

  if (stats.daysLeft && stats.wordsLeftToWrite) {
    description += `${stats.daysLeft} days left, ` + `to succeed you need to write ${stats.shouldWritePerDayToSucceed} words per day.`
  }

  return description
}
