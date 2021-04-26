import { MILESTONES } from '../../constants/brawl'
import getCoinsForWin from '../getCoinsForWin'
import getMilestoneForCrowns from '../getMilestoneForCrowns'

// @param {Integer} coins - Amount of available coins
// @param {Integer} crowns - Amount of obtained crowns
// @param {Float} winRatio - Win ratio between 0 (100% loss) and 1 (100% win)
// @param {Float} costModifier - Cost modifier between 0 (free) and 1 (normal)
// @param {String} setup - Wins strategy (ads, Steam…)
// @param {Boolean} hasLegendary5 - Whether has the Brawl legendary level 5
// @param {Boolean} withPremiumPass - Whether has the Premium Pass
const getMilestoneIndexFromCoins = (
  coins,
  winRatio = 1,
  crowns = 0,
  costModifier = 1,
  setup = 'NONE',
  hasLegendary5 = false,
  withPremiumPass = false
) => {
  if (typeof coins !== 'number' || typeof winRatio !== 'number') return -1

  // The Premium Pass grants an unlimited 10% discount to Brawl matches, which
  // is a cost modifier of 0.9. If there is also another cost modifier applied
  // (e.g. event-specific discount), multiply both.
  // For instance, 50% discount + Premium Pass = 0.5 * 0.9 = 0.45
  // Note that this is being discussed and not confirmed. Sheepyard is
  // considering having discounts being additive instead of cumulative.
  costModifier = (withPremiumPass ? 0.9 : 1) * costModifier

  const getCoins = getCoinsForWin(setup, withPremiumPass)
  const { nextIndex, next } = getMilestoneForCrowns(crowns)

  // If there is no next milestone, that means there are already too many crowns
  // for the entire Brawl and there is nothing else to do, therefore return -1
  // to handle that case specially.
  if (!next) return -1

  let index = nextIndex

  // While there are enough coins to play the current milestone, keep playing.
  while (MILESTONES[index] && coins >= MILESTONES[index].cost * costModifier) {
    coins -= MILESTONES[index].cost * costModifier
    coins += getCoins(winRatio)
    crowns += 5 * winRatio + (1 - winRatio)
    index = getMilestoneForCrowns(crowns).nextIndex

    // If there is no more next milestone, that means there was enough coins to
    // reach the entire milestone, and this milestone index should be returned.
    if (index === -1) return MILESTONES.length - 1
  }

  // Return the reached milestone, which is the one before the one which is
  // currently being played on.
  return index - 1
}

export default getMilestoneIndexFromCoins
