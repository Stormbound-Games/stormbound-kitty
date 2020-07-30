const isBrawlRunning = () => {
  const now = new Date()
  const dayOfTheWeek = now.getDay()
  const hours = now.getHours()

  switch (dayOfTheWeek) {
    case 1:
    case 2:
    case 3:
      return false
    case 5:
    case 6:
      return true
    case 4:
      return hours >= 9
    case 0:
      return hours < 10
    default:
      return false
  }
}

export default isBrawlRunning
