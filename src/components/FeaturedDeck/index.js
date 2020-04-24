import React from 'react'
import { Link } from 'react-router-dom'
import { CATEGORIES } from '../../constants/decks'
import { CollectionContext } from '../CollectionProvider'
import Deck from '../Deck'
import QuestionMark from '../QuestionMark'
import Only from '../Only'
import RarityBar from '../RarityBar'
import { Stones } from '../Resource'
import Tooltip from '../Tooltip'
import { deserialiseDeck } from '../../helpers/deserialise'
import { serialiseDeck } from '../../helpers/serialise'
import getDeckDistanceToMax from '../../helpers/getDeckDistanceToMax'
import getRawCardData from '../../helpers/getRawCardData'
import resolveCollection from '../../helpers/resolveCollection'
import './index.css'

const tooltipStyles = {
  backgroundColor: 'var(--dark-blue)',
  color: 'var(--white)',
  borderRadius: '2px',
  border: '1px solid var(--dark-beige)',
  boxShadow: '0 0 0 2px var(--dark-blue)',
  maxWidth: '15em',
  whiteSpace: 'normal',
}

const useAdjustedDeck = ({ category, id }) => {
  const { hasDefaultCollection, collection } = React.useContext(
    CollectionContext
  )

  if (hasDefaultCollection || category === 'EQUALS') {
    return { deck: deserialiseDeck(id), id, distance: null }
  }

  const deserialisedDeck = deserialiseDeck(id)
  const resolvedCollection = resolveCollection(collection)
  const deck = deserialisedDeck.map(card => ({
    ...card,
    level: resolvedCollection[card.id].level,
    missing: resolvedCollection[card.id].missing,
  }))
  const distance = getDeckDistanceToMax(resolvedCollection)({ id })

  return { deck, id: serialiseDeck(deck), distance }
}

const FeaturedDeck = props => {
  const { id, deck, distance } = useAdjustedDeck(props)

  return (
    <div className='FeaturedDeck'>
      <Deck
        deck={deck}
        orientation='horizontal'
        onClick={props.onClick}
        onClickLabel='Display card'
      />
      <div className='FeaturedDeck__rarity-bar'>
        <RarityBar deck={deck.map(card => getRawCardData(card.id))} />
      </div>
      <span className='FeaturedDeck__name'>
        <Link to={`/deck/${id}`}>{props.name}</Link>
        {distance && (
          <Only.CustomCollection>
            <Only.Desktop>
              <Tooltip
                style={tooltipStyles}
                label={
                  distance === Infinity ? (
                    'You are missing some cards from this deck'
                  ) : (
                    <>
                      Distance to maxed out deck: <Stones amount={distance} />
                    </>
                  )
                }
              >
                {trigger => <QuestionMark {...trigger} />}
              </Tooltip>
            </Only.Desktop>
          </Only.CustomCollection>
        )}
      </span>
      <span className='FeaturedDeck__author'>
        <Link
          to={{
            pathname: '/deck/suggestions',
            search: `?category=${props.category}`,
          }}
        >
          {CATEGORIES[props.category]}
        </Link>{' '}
        deck by{' '}
        <Link
          to={{
            pathname: '/deck/suggestions',
            search: `?author=${props.author}`,
          }}
        >
          {props.author}
        </Link>
      </span>
    </div>
  )
}

export default FeaturedDeck
