import computeDeckChances from '~/helpers/computeDeckChances'

const computeDeckChartData = (deck, modifier) => {
  const data = []
  let mana = 3
  let odds = computeDeckChances(deck, mana, modifier)

  // This avoids an edge case where no cards are playable on the first turn
  // (yielding 0% on both lines, and therefore never entering the loop).
  while (
    (odds.usingAllMana === 0 && odds.playingAllCards === 0) ||
    (odds.usingAllMana > 0 && odds.playingAllCards < 100)
  ) {
    data.push({
      mana,
      usingAllMana: +odds.usingAllMana.toFixed(2),
      playingAllCards: +odds.playingAllCards.toFixed(2),
    })
    mana += 1
    odds = computeDeckChances(deck, mana, modifier)
  }

  data.push({
    mana,
    usingAllMana: +odds.usingAllMana.toFixed(2),
    playingAllCards: +odds.playingAllCards.toFixed(2),
  })

  return data
}

export default computeDeckChartData
