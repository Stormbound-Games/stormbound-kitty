import React from 'react'
import { RARITIES, BOOKS } from '../../constants/game'
import capitalise from '../../helpers/capitalise'
import './index.css'

export default React.memo(({ book }) => {
  const { percentiles, draws } = BOOKS[book]

  return (
    <div className='BookExplanation'>
      <p>
        A {capitalise(book.toLowerCase())} book contains {draws}{' '}
        {draws > 1 ? 'cards' : 'card'} and potentially some Fusion stones. It
        cannot yield more than a single copy of a single card.
      </p>
      <p>The chances to draw are as follow:</p>
      <ul>
        {Object.keys(RARITIES).map((rarity, index) => (
          <li key={rarity}>
            {percentiles[index] * 100}% chance of pulling a {rarity} card
          </li>
        ))}
      </ul>
    </div>
  )
})
