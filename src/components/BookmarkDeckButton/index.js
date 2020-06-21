import React from 'react'
import { PersonalDecksContext } from '../PersonalDecksProvider'
import DiamondButton from '../DiamondButton'
import serialisation from '../../helpers/serialisation'

const getFactionFromId = id => {
  if (id.includes('i')) return 'ironclad'
  if (id.includes('s')) return 'swarm'
  if (id.includes('f')) return 'shadowfen'
  if (id.includes('w')) return 'winter'
  return 'neutral'
}

const getCategoryFromId = id => {
  const cards = serialisation.deck.deserialise(id)
  const average =
    cards.map(card => card.level).reduce((a, b) => a + b, 0) / cards.length

  if (average === 1) return 'EQUALS'
  if (average >= 4) return 'DIAMOND_1'
  return 'REGULAR'
}

export default React.memo(function BookmarkDeckButton(props) {
  const { decks, addDeck, removeDeck, toggleUnseen } = React.useContext(
    PersonalDecksContext
  )
  const isBookmarked = decks.map(deck => deck.id).includes(props.id)

  return (
    <DiamondButton
      onClick={() => {
        if (isBookmarked) {
          toggleUnseen(false)
          removeDeck(props.id)
        } else {
          toggleUnseen(true)
          addDeck({
            id: props.id,
            name: props.name || 'Unnamed deck',
            faction: props.faction || getFactionFromId(props.id),
            category: props.category || getCategoryFromId(props.id),
          })
        }
      }}
      icon='star'
      data-testid='bookmark-btn'
      aria-label='Bookmark deck'
      title='Bookmark deck'
      active={isBookmarked}
      className={props.className}
    />
  )
})
