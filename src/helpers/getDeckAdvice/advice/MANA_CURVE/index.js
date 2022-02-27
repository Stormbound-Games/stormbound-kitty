import computeDeckChances from '~/helpers/computeDeckChances'

const getManaCurveIntersection = async (deck, modifier) => {
  // 8 is a decent starting point to avoid unnecessary computations before that.
  // As a benchmark, Reckless Rush which is a notoriously cheap deck, has an
  // intersection of 9. Note that some decks with a mana-Brawl modifier can hit
  // way lower, such as Eye Tempest which hits 5.
  let mana = 8
  let odds = computeDeckChances(deck, mana, modifier)

  while (odds.usingAllMana >= odds.playingAllCards) {
    odds = computeDeckChances(deck, ++mana, modifier)
  }

  return mana
}

const advice = async (cards, modifier) => {
  const intersection = await getManaCurveIntersection(cards, modifier)
  const averageLevel =
    cards.map(card => card.level).reduce((acc, level) => acc + level, 0) / 12

  // Low-level decks have a less intense need to perfect their mana curve, so it
  // might not be worth bothering them too much with advice that are not
  // particularly relevant.
  if (averageLevel < 2.5) return null

  // The intersection is when it is as much or less likely to spend all the
  // available mana of a turn (with 0 leftover), than to play all cards from the
  // hand. 12 mana seems to be a decent arbitrary value for most decks.
  // An intersection above 12 mana might work in some decks, particularly
  // mana-ramp decks since Frozen Core, Dawnsparks and Freebooters are not taken
  // into account—but that’s a solid start for a lot of decks.
  if (intersection <= 12) return null

  return {
    name: 'High mana curve',
    description: `This deck’s mana curve appears to be a little high, making it likely to be overtaken by aggressive cheap decks. Consider balancing the cost of the cards a little more.`,
  }
}

export default advice
