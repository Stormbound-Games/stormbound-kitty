const WEEK_DAYS = [
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY'
]

export default (day, endOfDay) => {
  const date = new Date()
  const resultDate = new Date(date.getTime())

  resultDate.setDate(
    date.getDate() + ((7 + WEEK_DAYS.indexOf(day) - date.getDay()) % 7)
  )

  if (endOfDay) resultDate.setHours(23, 59, 59)

  return resultDate
}
