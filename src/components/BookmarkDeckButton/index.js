import React from 'react'
import { PersonalDecksContext } from '../PersonalDecksProvider'
import DiamondButton from '../DiamondButton'

export default React.memo(function BookmarkDeckButton(props) {
  const { decks, addDeck, removeDeck, toggleUnseen } = React.useContext(
    PersonalDecksContext
  )
  const isBookmarked = decks.map(deck => deck.id).includes(props.id)

  return (
    <DiamondButton
      onClick={() => {
        toggleUnseen(!isBookmarked)
        isBookmarked ? removeDeck(props.id) : addDeck(props)
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
