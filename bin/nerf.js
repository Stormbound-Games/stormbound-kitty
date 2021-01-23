import fs from 'fs'
import path from 'path'
import decks from '../src/data/decks'
import serialisation from '../src/helpers/serialisation'

const NERFS = {
  '07.2020': 'N70,N74,N76,F20,F28,S20,S21,S28,W9,W13,W19,W27'.split(','),
}

decks.forEach(deck => {
  const { deck: cards } = serialisation.deck.deserialise(deck.id)
  const ids = cards.map(card => card.id)

  Object.keys(NERFS).forEach(date => {
    const hasImpact = NERFS[date].some(id => ids.includes(id))
    if (hasImpact) deck.nerfed = date
  })
})

console.log(decks)

fs.writeFileSync(
  path.resolve('./src/data/decks.json'),
  JSON.stringify(decks, null, 2),
  'utf8'
)
