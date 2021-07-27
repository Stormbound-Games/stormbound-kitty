import { BRAWL_MILESTONES, CROWN_REWARDS } from '../../constants/brawl'

const DEFAULT_HEART = { isFull: true, isPermanent: true, isProtected: false }

const refill = heart => ({ ...heart, isFull: true })
const isPermanent = heart => heart.isPermanent

const processVictoryBonus = (meta, bonus) => {
  switch (bonus) {
    // If the bonus is “Life Up”, refill the first non-full heart.
    case 'LIFE_UP': {
      const index = meta.hearts.findIndex(heart => !heart.isFull)
      if (index > -1) meta.hearts[index].isFull = true
      break
    }

    // If the bonus is “All Lives Up”, refill all the hearts.
    case 'ALL_LIVES_UP': {
      meta.hearts = meta.hearts.map(refill)
      break
    }

    // If the bonus is “Rusty Slot”, add a new empty and temporary heart provided
    // there are not already 5 hearts.
    case 'RUSTY_SLOT': {
      if (meta.hearts.length < 5)
        meta.hearts.unshift({
          isFull: false,
          isPermanent: false,
          isProtected: false,
        })
      break
    }

    // If the bonus is “Gold solify”, make permanent the first non-permanent
    // heart.
    case 'GOLD_SLOT': {
      const index = meta.hearts.findIndex(heart => !heart.isPermanent)
      if (index > -1) meta.hearts[index].isPermanent = true
      break
    }

    // If the bonus is “Ice Armor”, protect the first full non-protected heart.
    case 'ICE_ARMOR': {
      const index = meta.hearts.findIndex(
        heart => heart.isFull && !heart.isProtected
      )
      if (index > -1) meta.hearts[index].isProtected = true
      break
    }

    // If the bonus is “Coins”, reduce the coins spent by the reward amount.
    case 'COINS': {
      // meta.coinsSpent -= value
      break
    }

    default:
      break
  }
}

const getBrawlStatus = (matches = [], difficulty = 'LEGACY') => {
  const milestones = BRAWL_MILESTONES[difficulty]
  const meta = {
    milestone: 0,
    crowns: 0,
    coinsSpent: 0,
    hearts: [{ ...DEFAULT_HEART }, { ...DEFAULT_HEART }, { ...DEFAULT_HEART }],
  }

  matches.forEach(match => {
    // Increment the cost of the match.
    meta.coinsSpent += milestones[meta.milestone].cost

    // Increment the crowns for the match.
    meta.crowns += CROWN_REWARDS[match.status]

    // If the match was a defeat, empty the first heart which is full.
    if (match.status === 'LOST' || match.status === 'SURRENDERED') {
      const indexProtected = meta.hearts.findIndex(heart => heart.isProtected)
      if (indexProtected > -1) meta.hearts[indexProtected].isProtected = false
      else {
        const index = meta.hearts.findIndex(heart => heart.isFull)
        if (index > -1) meta.hearts[index].isFull = false
      }
    }

    const milestone = milestones.findIndex(({ crowns }) => crowns > meta.crowns)

    processVictoryBonus(meta, match.bonus)

    // Check if there are enough crowns to move on to the next milestone. If
    // there are, refill empty hearts.
    if (milestone !== meta.milestone) {
      meta.milestone = milestone
      meta.hearts = meta.hearts.map(refill)
    }

    // If all hearts end up empty after the match, reset the amount of crowns to
    // the former milestone, and refill all hearts.
    if (meta.hearts.every(heart => !heart.isFull)) {
      meta.crowns =
        meta.milestone > 0 ? milestones[meta.milestone - 1].crowns : 0
      meta.hearts = meta.hearts.filter(isPermanent).map(refill)
    }
  })

  return meta
}

export default getBrawlStatus
