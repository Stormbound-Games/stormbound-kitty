import { MILESTONES } from '../../constants/brawl'
import getCoinsForWin from '../getCoinsForWin'

// @param {Integer} milestone - Index of the expected milestone
// @param {Float} winRatio - Win ratio between 0 (100% loss) and 1 (100% win)
// @param {Float} costModifier - Cost modifier between 0 (free) and 1 (normal)
// @param {String} setup - Wins strategy (ads, Steam…)
const getCostForMilestone = (
  milestone,
  winRatio = 1,
  costModifier = 1,
  setup = 'NONE'
) => {
  if (typeof milestone !== 'number' || typeof winRatio !== 'number') return 0

  const getCoins = getCoinsForWin(setup)
  let crowns = 0
  let index = 0
  let coins = 0

  while (index <= milestone && milestone !== 0) {
    coins += MILESTONES[index].cost * costModifier
    coins -= getCoins(winRatio)
    crowns += 5 * winRatio + (1 - winRatio)
    // eslint-disable-next-line no-loop-func
    index = MILESTONES.findIndex(milestone => milestone.crowns > crowns)
    if (index === -1) return coins
  }

  return coins
}

export default getCostForMilestone
