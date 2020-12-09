import { MILESTONES } from '../../constants/brawl'
import getCoinsForWin from '../getCoinsForWin'
import getMilestoneForCrowns from '../getMilestoneForCrowns'

// @param {Integer} milestone - Index of the expected milestone
// @param {Float} winRatio - Win ratio between 0 (100% loss) and 1 (100% win)
// @param {Integer} crowns - Amount of obtained crowns
// @param {Float} costModifier - Cost modifier between 0 (free) and 1 (normal)
// @param {String} setup - Wins strategy (ads, Steam…)
const getCostForMilestone = (
  milestone,
  winRatio = 1,
  crowns = 0,
  costModifier = 1,
  setup = 'NONE'
) => {
  if (typeof milestone !== 'number' || typeof winRatio !== 'number') return 0

  const getCoins = getCoinsForWin(setup)
  const { currentIndex, nextIndex } = getMilestoneForCrowns(crowns)

  // If there is no next milestone, that means there are already too many crowns
  // for the entire Brawl and there is nothing else to do. Similarly, if the
  // current milestone is the same or higher than the expected one, return 0
  // since there is no need for any coins.
  if (nextIndex === -1 || currentIndex >= milestone) return 0

  let index = nextIndex
  let coins = 0

  while (index > -1 && index <= milestone && milestone !== 0) {
    coins += MILESTONES[index].cost * costModifier
    coins -= getCoins(winRatio)
    crowns += 5 * winRatio + (1 - winRatio)
    index = getMilestoneForCrowns(crowns).nextIndex
  }

  return coins
}

export default getCostForMilestone
