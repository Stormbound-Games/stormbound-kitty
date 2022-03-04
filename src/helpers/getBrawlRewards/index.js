import { WeeklyIncome } from '~/helpers/Income'
import { BRAWL_MILESTONES } from '~/constants/brawl'
import getRewardFromMilestone from '~/helpers/getRewardFromMilestone'

const getBrawlRewards = (books, { casual, warrior, ultimate }) => {
  const rewards = new WeeklyIncome(books)

  for (let c = 0; c <= casual; c += 1) {
    rewards.add(getRewardFromMilestone(BRAWL_MILESTONES.CASUAL[c]))
  }

  for (let w = 0; w <= warrior; w += 1) {
    rewards.add(getRewardFromMilestone(BRAWL_MILESTONES.WARRIOR[w]))
  }

  for (let u = 0; u <= ultimate; u += 1) {
    rewards.add(getRewardFromMilestone(BRAWL_MILESTONES.ULTIMATE[u]))
  }

  return rewards
}

export default getBrawlRewards
