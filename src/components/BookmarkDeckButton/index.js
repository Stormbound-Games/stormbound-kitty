import React from 'react'
import { PersonalDecksContext } from '../PersonalDecksProvider'
import DiamondButton from '../DiamondButton'

export default React.memo(function BookmarkDeckButton(props) {
  const { decks, addDeck, removeDeck } = React.useContext(PersonalDecksContext)
  const isBookmarked = decks.map(deck => deck.id).includes(props.id)

  return (
    <DiamondButton
      onClick={() => (!isBookmarked ? addDeck(props) : removeDeck(props.id))}
      icon='star'
      data-testid='bookmark-btn'
      aria-label='Bookmark deck'
      title='Bookmark deck'
      active={isBookmarked}
    />
  )
})
