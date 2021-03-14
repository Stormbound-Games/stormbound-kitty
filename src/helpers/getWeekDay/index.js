const WEEK_DAYS = [
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
]

export const getNextWeekDay = (
  day,
  { anchor = new Date(), endOfDay, skipToday } = {}
) => {
  const dayIndex = WEEK_DAYS.indexOf(day)

  if (anchor.getDay() === dayIndex && skipToday) {
    anchor.setDate(anchor.getDate() + 1)
  }

  const resultDate = new Date(anchor.getTime())

  resultDate.setDate(anchor.getDate() + ((7 + dayIndex - anchor.getDay()) % 7))

  if (endOfDay) resultDate.setHours(23, 59, 59)

  return resultDate
}

export const getLastWeekDay = (day, options) => {
  const next = getNextWeekDay(day, options)
  const date = new Date(next.valueOf())
  date.setDate(date.getDate() - 7)
  return date
}
