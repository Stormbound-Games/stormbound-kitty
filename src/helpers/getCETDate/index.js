const getCETDate = () => {
  const localDate = new Date()
  const utcOffset = localDate.getTimezoneOffset()
  const cetOffset = utcOffset + 60
  const cestOffset = utcOffset + 120
  const cetOffsetInMilliseconds = cetOffset * 60 * 1000
  const cestOffsetInMilliseconds = cestOffset * 60 * 1000
  const cestDateStart = new Date()
  const cestDateFinish = new Date()
  const localDateTime = localDate.getTime()

  cestDateStart.setTime(
    Date.parse('29 March ' + localDate.getFullYear() + ' 02:00:00 GMT+0100')
  )
  cestDateFinish.setTime(
    Date.parse('25 October ' + localDate.getFullYear() + ' 03:00:00 GMT+0200')
  )

  const cestDateStartTime = cestDateStart.getTime()
  const cestDateFinishTime = cestDateFinish.getTime()

  if (
    localDateTime >= cestDateStartTime &&
    localDateTime <= cestDateFinishTime
  ) {
    return new Date(localDateTime + cestOffsetInMilliseconds)
  }

  return new Date(localDateTime + cetOffsetInMilliseconds)
}

export default getCETDate
