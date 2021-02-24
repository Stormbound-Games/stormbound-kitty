import { WeeklyIncome } from '../Income'

const getBrawlRewards = milestone => {
  const rewards = new WeeklyIncome()

  if (milestone >= 0) rewards.openBook('HUMBLE')
  if (milestone >= 1) rewards.add({ rubies: 5 })
  if (milestone >= 2) rewards.openBook('CLASSIC')
  if (milestone >= 3) rewards.add({ stones: 10 })
  if (milestone >= 4) rewards.openBook('MYTHIC')
  if (milestone >= 5) rewards.add({ cards: [0, 0, 0, 1] })
  if (milestone >= 6) rewards.add({ stones: 50 })
  if (milestone >= 7) rewards.add({ rubies: 250 })
  if (milestone >= 8) rewards.add({ cards: [0, 0, 0, 5] })
  if (milestone >= 9) rewards.add({ stones: 200 })

  return rewards
}

export default getBrawlRewards
