import isBrawlRunning from '../isBrawlRunning'
import getBrawlInformation from '../getBrawlInformation'
import { getLastWeekDay, getNextWeekDay } from '../getWeekDay'

const getNearBrawl = message => {
  const date = new Date()
  // To try another day and/or hours:
  // date.setDate(date.getDate() + 4)
  // date.setHours(3)
  const options = {
    date,
    skipToday: isBrawlRunning(date),
    startOfDay: true,
    endOfDay: true,
  }

  if (message === 'next' || message === 'upcoming') {
    return getBrawlInformation(getNextWeekDay('THURSDAY', options))
  }

  if (message === 'prev' || message === 'previous') {
    return getBrawlInformation(getLastWeekDay('MONDAY', options))
  }

  return getBrawlInformation(date)
}

export default getNearBrawl
