import { BRAWL_MILESTONES } from '~/constants/brawl'

const getMilestoneForCrowns = (crowns = 0, difficulty = 'LEGACY') => {
  const milestones = BRAWL_MILESTONES[difficulty]
  const nextIndex = milestones.findIndex(milestone => milestone.crowns > crowns)

  if (nextIndex === -1) {
    return {
      current: milestones[milestones.length - 1],
      currentIndex: milestones.length - 1,
      next: null,
      nextIndex: -1,
    }
  }

  return {
    current: milestones[nextIndex - 1] || null,
    currentIndex: nextIndex - 1,
    next: milestones[nextIndex],
    nextIndex,
  }
}

export default getMilestoneForCrowns
