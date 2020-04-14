import React from 'react'
import { RARITIES, BOOKS } from '../../constants/game'
import capitalise from '../../helpers/capitalise'
import getAverageStonesPerBook from '../../helpers/getAverageStonesPerBook'
import './index.css'

const BookExplanation = ({ book }) => {
  const { percentiles, draws } = BOOKS[book]

  return (
    <div className='BookExplanation'>
      <p>
        A {capitalise(book.toLowerCase())} book contains {draws}{' '}
        {draws > 1 ? 'cards' : 'card'}. It contains an average of{' '}
        <strong>
          {getAverageStonesPerBook(book).toFixed(2)} Fusion stones
        </strong>{' '}
        and cannot contain more than a single copy of a single card.
      </p>
      <p>The chances to draw are as follow:</p>
      <ul>
        {Object.keys(RARITIES).map((rarity, index) => (
          <li key={rarity}>
            {percentiles[index]}% chance of pulling a {rarity} card
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BookExplanation
