import { MILESTONES } from '../../constants/brawl'
import getCoinsForWin from '../getCoinsForWin'

const getCostForMilestone = (milestoneIndex, winRate, setup = 'NONE') => {
  const getCoins = getCoinsForWin(setup)
  let crowns = 0
  let index = 0
  let coins = 0

  while (index <= milestoneIndex && milestoneIndex !== 0) {
    coins += MILESTONES[index].cost
    coins -= getCoins(winRate / 100)
    crowns += (5 * winRate) / 100 + (100 - winRate) / 100
    // eslint-disable-next-line no-loop-func
    index = MILESTONES.findIndex(milestone => milestone.crowns > crowns)
    if (index === -1) return coins
  }

  return coins
}

export default getCostForMilestone
