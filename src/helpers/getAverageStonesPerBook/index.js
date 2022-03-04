const RARITY_STONES = {
  COMMON: 5,
  RARE: 10,
  EPIC: 25,
  LEGENDARY: 50,
}

const getAverageStonesPerBook = book => {
  // There is roughly 10% chance to get fusion stones, regardless of the type of
  // book. And the amount of fusion stones depends on the rarity of the card
  // that gets replaced.
  return (
    book.odds
      .map(
        (percentile, index) => percentile * Object.values(RARITY_STONES)[index]
      )
      .reduce((a, b) => a + b, 0) * 0.1
  )
}

export default getAverageStonesPerBook
