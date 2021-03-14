const isBrawlRunning = (date = new Date()) => {
  const dayOfTheWeek = date.getDay()
  const hours = date.getHours()

  switch (dayOfTheWeek) {
    // The Brawl ends at 7AM UTC on Monday.
    case 1:
      return hours < 7
    case 2:
    case 3:
      return false
    case 5:
    case 6:
    case 0:
      return true
    // The Brawl starts at 7AM UTC on Thursday.
    case 4:
      return hours >= 7
    default:
      return false
  }
}

export default isBrawlRunning
