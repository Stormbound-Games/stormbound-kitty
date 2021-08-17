import React from 'react'
import { RARITIES } from '~/constants/game'
import { BOOKS } from '~/constants/books'
import getBookName from '~/helpers/getBookName'

export default React.memo(function BookExplanation({ book }) {
  const { percentiles, draws, only = {} } = BOOKS[book]
  const qualifier = [
    only.rarity,
    only.elder && 'elder',
    only.race,
    only.type,
    only.ability && only.ability.toString().replace(/\//g, ''),
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <>
      <p>
        A {getBookName(book)} contains {draws} {qualifier}{' '}
        {draws > 1 ? 'cards' : 'card'} and potentially some Fusion stones. It
        cannot yield more than a single copy of a single card.
      </p>
      <p>The chances to draw are as follow:</p>
      <ul>
        {Object.keys(RARITIES).map((rarity, index) => (
          <li key={rarity}>
            {(percentiles[index] * 100).toFixed(0)}% chance of pulling a{' '}
            {rarity} card
          </li>
        ))}
      </ul>
    </>
  )
})
