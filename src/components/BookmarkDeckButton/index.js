import React from 'react'
import { PersonalDecksContext } from '../PersonalDecksProvider'
import DiamondButton from '../DiamondButton'

export default React.memo(function BookmarkDeckButton(props) {
  const { decks, addDeck, removeDeck, toggleUnseen } =
    React.useContext(PersonalDecksContext)
  // This check is performed on the deck ID instead of its UUID because only
  // bookmarked decks have a UUID; the others do not. To know whether a deck has
  // been bookmarked, we need to see if it exists in the bookmarked collection.
  const bookmark = decks.find(deck => deck.id === props.id)

  return (
    <DiamondButton
      onClick={() => {
        toggleUnseen(!bookmark)
        bookmark ? removeDeck(bookmark.uuid) : addDeck(props)
      }}
      icon='star'
      data-testid='bookmark-btn'
      label='Bookmark deck'
      isActive={Boolean(bookmark)}
      extend={props.extend}
    />
  )
})
