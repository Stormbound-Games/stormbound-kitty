import { MILESTONES } from '../../constants/brawl'
import getCoinsForWin from '../getCoinsForWin'

// @param {Integer} coins - Amount of available coins
// @param {Float} winRatio - Win ratio between 0 (100% loss) and 1 (100% win)
// @param {Float} costModifier - Cost modifier between 0 (free) and 1 (normal)
// @param {String} setup - Wins strategy (ads, Steam…)
const getMilestoneIndexFromCoins = (
  coins,
  winRatio = 1,
  costModifier = 1,
  setup = 'NONE'
) => {
  if (typeof coins !== 'number' || typeof winRatio !== 'number') return -1

  const getCoins = getCoinsForWin(setup)
  let crowns = 0
  let index = 0

  while (coins >= MILESTONES[index].cost * costModifier) {
    coins -= MILESTONES[index].cost * costModifier
    coins += getCoins(winRatio)
    crowns += 5 * winRatio + (1 - winRatio)
    // eslint-disable-next-line no-loop-func
    index = MILESTONES.findIndex(milestone => milestone.crowns > crowns)
    if (index === -1) return MILESTONES.length - 1
  }

  return index - 1
}

export default getMilestoneIndexFromCoins
