import { BRAWL_MILESTONES } from '~/constants/brawl'
import getMilestoneForCrowns from './'

describe('The `getMilestoneForCrowns` helper', () => {
  it('should handle 0 crowns', () => {
    const actual = getMilestoneForCrowns(0)
    expect(actual.currentIndex).toEqual(-1)
    expect(actual.nextIndex).toEqual(0)
    expect(actual.current).toEqual(null)
    expect(actual.next).toEqual(BRAWL_MILESTONES.LEGACY[0])
  })

  it('should handle before first milestone', () => {
    const actual = getMilestoneForCrowns(0)
    expect(actual.currentIndex).toEqual(-1)
    expect(actual.nextIndex).toEqual(0)
    expect(actual.current).toEqual(null)
    expect(actual.next).toEqual(BRAWL_MILESTONES.LEGACY[0])
  })

  it('should handle any milestone', () => {
    BRAWL_MILESTONES.LEGACY.slice(0, -1).forEach((milestone, index) => {
      const actual = getMilestoneForCrowns(milestone.crowns + 1)
      expect(actual.currentIndex).toEqual(index)
      expect(actual.nextIndex).toEqual(index + 1)
      expect(actual.current).toEqual(BRAWL_MILESTONES.LEGACY[index])
      expect(actual.next).toEqual(BRAWL_MILESTONES.LEGACY[index + 1])
    })
  })

  it('should handle too many crowns', () => {
    const actual = getMilestoneForCrowns(300)
    expect(actual.currentIndex).toEqual(9)
    expect(actual.nextIndex).toEqual(-1)
    expect(actual.current).toEqual(BRAWL_MILESTONES.LEGACY[9])
    expect(actual.next).toEqual(null)
  })
})
