import { BRAWLS, CYCLE_START } from '../../constants/brawl'

function weeksBetween(d1, d2) {
  return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000))
}

const getCurrentBrawl = () => {
  const weeks = weeksBetween(CYCLE_START, Date.now())
  return BRAWLS.slice(weeks, weeks !== -1 ? weeks + 1 : undefined)[0]
}

export default getCurrentBrawl
