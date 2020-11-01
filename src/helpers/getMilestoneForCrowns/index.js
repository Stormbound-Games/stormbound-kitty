import { MILESTONES } from '../../constants/brawl'

export default (crowns = 0) => {
  const nextIndex = MILESTONES.findIndex(milestone => milestone.crowns > crowns)

  if (nextIndex === -1) {
    return {
      current: MILESTONES[MILESTONES.length - 1],
      currentIndex: MILESTONES.length - 1,
      next: null,
      nextIndex: -1,
    }
  }

  return {
    current: MILESTONES[nextIndex - 1] || null,
    currentIndex: nextIndex - 1,
    next: MILESTONES[nextIndex],
    nextIndex,
  }
}
