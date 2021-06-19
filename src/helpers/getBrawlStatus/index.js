import { BRAWL_MILESTONES, CROWN_REWARDS } from '../../constants/brawl'

const getBrawlStatus = (matches = [], difficulty = 'LEGACY') => {
  const milestones = BRAWL_MILESTONES[difficulty]
  const meta = {
    milestone: 0,
    crowns: 0,
    losses: 0,
    coinsSpent: 0,
  }

  matches.forEach(match => {
    // Increment the cost of the match.
    meta.coinsSpent += milestones[meta.milestone].cost

    // Increment the crowns for the match.
    meta.crowns += CROWN_REWARDS[match.status]

    // If the match was a defeat, increment the loss counter.
    if (match.status === 'LOST' || match.status === 'SURRENDERED') meta.losses++

    const milestone = milestones.findIndex(({ crowns }) => crowns > meta.crowns)

    // Check if there are enough crowns to move on to the next milestone. If
    // there are, reset the loss counter.
    if (milestone !== meta.milestone) {
      meta.milestone = milestone
      meta.losses = 0
    }

    // If there are 3 losses, reset the amount of crowns to the former
    // milestone, and reset the loss counter.
    if (meta.losses === 3) {
      meta.crowns =
        meta.milestone > 0 ? milestones[meta.milestone - 1].crowns : 0
      meta.losses = 0
    }
  })

  return meta
}

export default getBrawlStatus
