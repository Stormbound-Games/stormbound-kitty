import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import NavLink from '../NavLink'
import { deserialiseDeck } from '../../helpers/deserialise'

const DeckBuilderNav = props => {
  const match = useRouteMatch()
  const id = match.params.deckId
  const deck = id ? deserialiseDeck(id) : []
  const hasBigEnoughDeck = deck.length === 12

  return (
    <nav className='Header__nav'>
      <ul className='Header__list Header__list--sub'>
        <li className='Header__item'>
          <NavLink exact to={id ? `/deck/${id}` : '/deck'}>
            Editor
          </NavLink>
        </li>
        <li className='Header__item'>
          {hasBigEnoughDeck ? (
            <NavLink to={`/deck/${id}/detail`}>Detail</NavLink>
          ) : (
            <span
              className='Header__link Header__link--disabled'
              title='Your deck is not complete'
            >
              Detail
            </span>
          )}
        </li>
        <li className='Header__item'>
          {hasBigEnoughDeck ? (
            <NavLink to={`/deck/${id}/dry-run`}>Dry-run</NavLink>
          ) : (
            <span
              className='Header__link Header__link--disabled'
              title='Your deck is not complete'
            >
              Dry-run
            </span>
          )}
        </li>
        <li className='Header__item'>
          {hasBigEnoughDeck ? (
            deck.map(card => card.id).includes('N38') ? (
              <span
                className='Header__link Header__link--disabled'
                title='Harvesters of Souls are not supported in the tracker'
              >
                Tracker
              </span>
            ) : (
              <NavLink to={`/deck/${id}/tracker`}>Tracker</NavLink>
            )
          ) : (
            <span
              className='Header__link Header__link--disabled'
              title='Your deck is not complete'
            >
              Tracker
            </span>
          )}
        </li>

        <li className='Header__item Header__item--right'>
          <NavLink to='/deck/suggestions'>Ready decks</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default DeckBuilderNav
