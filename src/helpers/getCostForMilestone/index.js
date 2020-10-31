import { MILESTONES } from '../../constants/brawl'
import getCoinsForWin from '../getCoinsForWin'

// @param {Integer} milestone - Index of the expected milestone
// @param {Number} winRate - Win rate in %
// @param {Float} costModifier - Cost modifier between 0 (free) and 1 (normal)
// @param {String} setup - Wins strategy (ads, Steam…)
const getCostForMilestone = (
  milestone,
  winRate,
  costModifier = 1,
  setup = 'NONE'
) => {
  const getCoins = getCoinsForWin(setup)
  let crowns = 0
  let index = 0
  let coins = 0

  while (index <= milestone && milestone !== 0) {
    coins += MILESTONES[index].cost * costModifier
    coins -= getCoins(winRate / 100)
    crowns += (5 * winRate) / 100 + (100 - winRate) / 100
    // eslint-disable-next-line no-loop-func
    index = MILESTONES.findIndex(milestone => milestone.crowns > crowns)
    if (index === -1) return coins
  }

  return coins
}

export default getCostForMilestone
