import React from 'react'
import { useFela } from 'react-fela'
import { RARITIES } from '~/constants/game'

export default React.memo(function BookExplanation({ book }) {
  const { css } = useFela()
  const qualifier = [
    book.only.rarity,
    book.only.elder && 'elder',
    book.only.ancient && 'ancient',
    book.only.hero && 'hero',
    book.only.faction,
    book.only.race,
    book.only.type,
    book.only.ability,
    book.only.name,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <>
      <p>
        A {book.name} contains {book.draws} {qualifier}{' '}
        {book.draws > 1 ? 'cards' : 'card'} and potentially some Fusion stones.
        It cannot yield more than a single copy of a single card.
      </p>
      <p>The chances of drawing are as follow:</p>
      <ul className={css({ margin: 0, paddingLeft: 'var(--s-base)' })}>
        {Object.keys(RARITIES).map((rarity, index) => (
          <li key={rarity}>
            {(book.odds[index] * 100).toFixed(0)}% chance of drawing a {rarity}{' '}
            card
          </li>
        ))}
      </ul>
    </>
  )
})
