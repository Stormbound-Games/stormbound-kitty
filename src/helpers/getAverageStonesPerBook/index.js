const RARITY_STONES = {
  COMMON: 5,
  RARE: 10,
  EPIC: 25,
  LEGENDARY: 50,
}

const getAverageStonesPerBook = book =>
  book.odds
    .map(
      (percentile, index) => percentile * Object.values(RARITY_STONES)[index]
    )
    .reduce((a, b) => a + b, 0) * book.fsOdds

export default getAverageStonesPerBook
