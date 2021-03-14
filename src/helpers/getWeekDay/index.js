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
  { date = new Date(), endOfDay, skipToday } = {}
) => {
  const dayIndex = WEEK_DAYS.indexOf(day)

  if (date.getDay() === dayIndex && skipToday) {
    date.setDate(date.getDate() + 1)
  }

  const resultDate = new Date(date.getTime())

  resultDate.setDate(date.getDate() + ((7 + dayIndex - date.getDay()) % 7))

  if (endOfDay) resultDate.setHours(23, 59, 59)

  return resultDate
}

export const getLastWeekDay = (
  day,
  { date = new Date(), startOfDay, skipToday } = {}
) => {
  const dayIndex = WEEK_DAYS.indexOf(day)

  if (date.getDay() === dayIndex && skipToday) {
    date.setDate(date.getDate() - 1)
  }

  const resultDate = new Date(date.getTime())

  resultDate.setDate(date.getDate() - ((7 + date.getDay() - dayIndex) % 7))

  if (startOfDay) resultDate.setHours(0, 0, 0)

  return resultDate
}
