import { MILESTONES } from '../../constants/brawl'
import getCoinsForWin from '../getCoinsForWin'

const getMilestoneIndexFromCoins = (coins, winRate, setup = 'NONE') => {
  if (typeof coins !== 'number' || typeof winRate !== 'number') return -1

  const getCoins = getCoinsForWin(setup)
  let crowns = 0
  let index = 0

  while (coins >= MILESTONES[index].cost) {
    coins -= MILESTONES[index].cost
    coins += getCoins(winRate / 100)
    crowns += (5 * winRate) / 100 + (100 - winRate) / 100
    // eslint-disable-next-line no-loop-func
    index = MILESTONES.findIndex(milestone => milestone.crowns > crowns)
    if (index === -1) return MILESTONES.length - 1
  }

  return index - 1
}

export default getMilestoneIndexFromCoins
