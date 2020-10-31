import { MILESTONES } from '../../constants/brawl'
import getCoinsForWin from '../getCoinsForWin'

// @param {Integer} coins - Amount of available coins
// @param {Number} winRate - Win rate in %
// @param {Float} costModifier - Cost modifier between 0 (free) and 1 (normal)
// @param {String} setup - Wins strategy (ads, Steam…)
const getMilestoneIndexFromCoins = (
  coins,
  winRate,
  costModifier = 1,
  setup = 'NONE'
) => {
  if (typeof coins !== 'number' || typeof winRate !== 'number') return -1

  const getCoins = getCoinsForWin(setup)
  let crowns = 0
  let index = 0

  while (coins >= MILESTONES[index].cost * costModifier) {
    coins -= MILESTONES[index].cost * costModifier
    coins += getCoins(winRate / 100)
    crowns += (5 * winRate) / 100 + (100 - winRate) / 100
    // eslint-disable-next-line no-loop-func
    index = MILESTONES.findIndex(milestone => milestone.crowns > crowns)
    if (index === -1) return MILESTONES.length - 1
  }

  return index - 1
}

export default getMilestoneIndexFromCoins
