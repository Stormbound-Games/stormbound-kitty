import { BRAWL_MILESTONES } from '../../constants/brawl'
import getDailyCoinsCounter from '../getDailyCoinsCounter'
import getMilestoneForCrowns from '../getMilestoneForCrowns'

// @param {String} difficulty - Brawl difficulty
// @param {String} league - Current league
// @param {Integer} coins - Amount of available coins
// @param {Integer} crowns - Amount of obtained crowns
// @param {Float} winRatio - Win ratio between 0 (100% loss) and 1 (100% win)
// @param {Float} costModifier - Cost modifier between 0 (free) and 1 (normal)
// @param {String} setup - Wins strategy (ads, Steam…)
// @param {Boolean} withPremiumPass - Whether has the Premium Pass
const getMilestoneIndexFromCoins = ({
  difficulty = 'LEGACY',
  league,
  coins,
  winRatio = 1,
  crowns = 0,
  costModifier = 1,
  setup = 'NONE',
  withPremiumPass = false,
}) => {
  if (typeof coins !== 'number' || typeof winRatio !== 'number') return -1

  // While this is not confirmed yet, there seem to be no plan to add multiple
  // discounts, so we take the highest discount (hence lowest cost modifier).
  costModifier = Math.min(withPremiumPass ? 0.9 : 1, costModifier)

  const getCoins = getDailyCoinsCounter({ setup, league, withPremiumPass })
  const { nextIndex, next } = getMilestoneForCrowns(crowns, difficulty)
  const milestones = BRAWL_MILESTONES[difficulty]

  // If there is no next milestone, that means there are already too many crowns
  // for the entire Brawl and there is nothing else to do, therefore return -1
  // to handle that case specially.
  if (!next) return -1

  let index = nextIndex

  // While there are enough coins to play the current milestone, keep playing.
  while (milestones[index] && coins >= milestones[index].cost * costModifier) {
    coins -= milestones[index].cost * costModifier
    coins += getCoins(winRatio)
    crowns += 5 * winRatio + (1 - winRatio)
    index = getMilestoneForCrowns(crowns, difficulty).nextIndex

    // If there is no more next milestone, that means there was enough coins to
    // reach the entire milestone, and this milestone index should be returned.
    if (index === -1) return milestones.length - 1
  }

  // Return the reached milestone, which is the one before the one which is
  // currently being played on.
  return index - 1
}

export default getMilestoneIndexFromCoins
