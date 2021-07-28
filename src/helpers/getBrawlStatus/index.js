import { BRAWL_MILESTONES, CROWN_REWARDS } from '../../constants/brawl'

const DEFAULT_HEART = { isFull: true, isPermanent: true, isProtected: false }

const refill = heart => ({ ...heart, isFull: true })
const unprotect = heart => ({ ...heart, isProtected: false })
const isPermanent = heart => heart.isPermanent
const isNotPermanent = heart => !heart.isPermanent
const isFull = heart => heart.isFull
const isEmpty = heart => !heart.isFull
const isProtected = heart => heart.isProtected

const processVictory = (meta, bonus) => {
  const getFirstIndex = predicate => meta.hearts.findIndex(predicate)
  const getLastIndex = predicate =>
    meta.hearts.length - 1 - meta.hearts.slice(0).reverse().findIndex(predicate)

  switch (bonus) {
    // If the bonus is “Life Up”, refill the first empty heart.
    case 'LIFE_UP': {
      const index = getFirstIndex(isEmpty)
      if (index > -1) meta.hearts[index].isFull = true
      break
    }

    // If the bonus is “All Lives Up”, refill all empty hearts.
    case 'ALL_LIVES_UP': {
      meta.hearts = meta.hearts.map(refill)
      break
    }

    // If the bonus is “Rusty Slot”, add a new empty and non-permanent heart
    // provided there are not already 5 hearts.
    case 'RUSTY_SLOT': {
      if (meta.hearts.length < 5)
        meta.hearts.push({
          isFull: false,
          isPermanent: false,
          isProtected: false,
        })
      break
    }

    // If the bonus is “Gold solify”, make permanent the first non-permanent
    // heart.
    case 'GOLD_SLOT': {
      const index = getLastIndex(isNotPermanent)
      if (index > -1) meta.hearts[index].isPermanent = true
      break
    }

    // If the bonus is “Ice Armor”, protect the first full non-protected heart.
    case 'ICE_ARMOR': {
      const index = getFirstIndex(heart => isFull(heart) && !isProtected(heart))
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

const processDefeat = meta => {
  // Iterate through the hearts from the rightmost heart to the first one.
  for (let i = meta.hearts.length - 1; i >= 0; i--) {
    const heart = meta.hearts[i]

    // If the heart is not full, skip to previous heart.
    if (isEmpty(heart)) continue

    // If the heart is protected, break the Ice Armor and stop there.
    if (isProtected(heart)) {
      heart.isProtected = false
      break
    }

    // If the heart is not a permanent heart (full is implied), remove it.
    if (isNotPermanent(heart)) {
      meta.hearts.splice(i, 1)
      break
    }

    // Otherwise, empty the heart.
    heart.isFull = false
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
      processDefeat(meta)
    } else if (match.bonus) {
      processVictory(meta, match.bonus)
    }

    const milestone = milestones.findIndex(({ crowns }) => crowns > meta.crowns)

    // Check if there are enough crowns to move on to the next milestone. If
    // there are, refill empty hearts and remove all Ice Armors.
    if (milestone !== meta.milestone) {
      meta.milestone = milestone
      meta.hearts = meta.hearts.map(refill).map(unprotect)
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
