import { RARITY_COPIES } from '~/constants/game'
import { BRAWL_MILESTONES } from '~/constants/brawl'
import getMilestoneCost from '~/helpers/getMilestoneCost'
import getDailyCoinsCounter from '~/helpers/getDailyCoinsCounter'
import getMilestoneForCrowns from '~/helpers/getMilestoneForCrowns'

// @param {String} difficulty - Brawl difficulty
// @param {String} league - Current league
// @param {Integer} milestone - Index of the expected milestone
// @param {Float} winRatio - Win ratio between 0 (100% loss) and 1 (100% win)
// @param {Integer} crowns - Amount of obtained crowns
// @param {Float} costModifier - Cost modifier between 0 (free) and 1 (normal)
// @param {String} setup - Wins strategy (ads, Steam…)
// @param {Boolean} hasLegendary5 - Whether has the Brawl legendary level 5
// @param {Boolean} withPremiumPass - Whether has the Premium Pass
const getCostForMilestone = ({
  difficulty = 'LEGACY',
  league,
  milestone,
  winRatio = 1,
  crowns = 0,
  costModifier = 1,
  setup = 'NONE',
  hasLegendary5 = false,
  withPremiumPass = false,
}) => {
  if (typeof milestone !== 'number' || typeof winRatio !== 'number') return 0

  // While this is not confirmed yet, there seem to be no plan to add multiple
  // discounts, so we take the highest discount (hence lowest cost modifier).
  costModifier = Math.min(withPremiumPass ? 0.9 : 1, costModifier)

  const getCoins = getDailyCoinsCounter({ setup, league, withPremiumPass })
  const { currentIndex, nextIndex } = getMilestoneForCrowns(crowns, difficulty)
  const milestones = BRAWL_MILESTONES[difficulty]

  // If there is no next milestone, that means there are already too many crowns
  // for the entire Brawl and there is nothing else to do. Similarly, if the
  // current milestone is the same or higher than the expected one, return 0
  // since there is no need for any coins.
  if (nextIndex === -1 || currentIndex >= milestone) return 0

  let index = nextIndex
  let coins = 0

  while (index > -1 && index <= milestone && milestone !== 0) {
    coins += getMilestoneCost(milestones[index], costModifier)
    coins -= getCoins(winRatio)
    crowns += 5 * winRatio + (1 - winRatio)

    let { nextIndex } = getMilestoneForCrowns(crowns, difficulty)

    if (index !== nextIndex) {
      // If the player has the legendary card from the Brawl level 5 already and
      // the reached milestone reward is copies of the legendary card, convert
      // these copies into coins.
      if (hasLegendary5 && milestones[index].reward === 'LEGENDARY_CARD') {
        coins -=
          milestones[index].rewardAmount *
          RARITY_COPIES.legendary.coinsPerExtraCopy
      }

      index = nextIndex
    }
  }

  return coins
}

export default getCostForMilestone
