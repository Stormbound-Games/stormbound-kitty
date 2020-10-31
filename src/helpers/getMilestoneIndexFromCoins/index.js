import { MILESTONES } from '../../constants/brawl'

const getMilestoneIndexFromCoins = (coins, winRate) => {
  if (typeof coins !== 'number' || typeof winRate !== 'number') return -1

  let crowns = 0
  let index = 0

  while (coins >= MILESTONES[index].cost) {
    coins -= MILESTONES[index].cost
    crowns += (5 * winRate) / 100 + (100 - winRate) / 100
    // eslint-disable-next-line no-loop-func
    index = MILESTONES.findIndex(milestone => milestone.crowns > crowns)
    if (index === -1) return MILESTONES.length - 1
  }

  return index - 1
}

export default getMilestoneIndexFromCoins
