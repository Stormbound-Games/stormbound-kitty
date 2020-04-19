import React from 'react'
import { Link } from 'react-router-dom'
import { CATEGORIES } from '../../constants/decks'
import { CollectionContext } from '../CollectionProvider'
import Deck from '../Deck'
import RarityBar from '../RarityBar'
import { deserialiseDeck } from '../../helpers/deserialise'
import { serialiseDeck } from '../../helpers/serialise'
import getRawCardData from '../../helpers/getRawCardData'
import resolveCollection from '../../helpers/resolveCollection'
import './index.css'

const DeckBuilderSuggestion = props => {
  const { hasDefaultCollection, collection } = React.useContext(
    CollectionContext
  )

  // Recompute the level of the cards in the deck to match the ones from the
  // collection
  const deserialisedDeck = deserialiseDeck(props.id)
  const resolvedCollection = !hasDefaultCollection
    ? resolveCollection(collection)
    : null
  const deck = hasDefaultCollection
    ? deserialisedDeck
    : deserialisedDeck.map(card => ({
        ...card,
        level: resolvedCollection[card.id].level,
        missing: resolvedCollection[card.id].missing,
      }))

  return (
    <div className='DeckBuilderSuggestion'>
      <Deck
        deck={deck}
        orientation='horizontal'
        onClick={props.onClick}
        onClickLabel='Display card'
      />
      <div className='DeckBuilderSuggestion__rarity-bar'>
        <RarityBar deck={deck.map(({ id }) => getRawCardData(id))} />
      </div>
      <span className='DeckBuilderSuggestion__name'>
        <Link to={`/deck/${serialiseDeck(deck)}`}>{props.name}</Link>
      </span>
      <span className='DeckBuilderSuggestion__author'>
        <Link to={`/deck/suggestions?category=${props.category}`}>
          {CATEGORIES[props.category]}
        </Link>{' '}
        deck by{' '}
        <Link to={`/deck/suggestions?author=${props.author}`}>
          {props.author}
        </Link>
      </span>
    </div>
  )
}

export default DeckBuilderSuggestion
