import { BRAWLS, CYCLE_START } from '~/constants/brawl'

function weeksBetween(d1, d2) {
  return Math.floor((d2 - d1) / (7 * 24 * 60 * 60 * 1000))
}

const getCurrentBrawl = (date = new Date()) => {
  const weeks = weeksBetween(CYCLE_START, date)
  const index = weeks % BRAWLS.length

  return BRAWLS[index] || BRAWLS[0]
}

export default getCurrentBrawl
