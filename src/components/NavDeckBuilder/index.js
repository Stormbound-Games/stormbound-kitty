import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import NavLink from '../NavLink'
import { deserialiseDeck } from '../../helpers/deserialise'

const NavDeckBuilder = props => {
  const match = useRouteMatch()
  const id = match.params.deckId
  const deck = id ? deserialiseDeck(id) : []
  const hasBigEnoughDeck = deck.length === 12

  return (
    <nav className='Header__nav'>
      <ul className='Header__list Header__list--sub'>
        <li className='Header__item'>
          <NavLink
            to={id ? `/deck/${id}` : '/deck'}
            active={props.active === 'EDITOR'}
          >
            Editor
          </NavLink>
        </li>
        <li className='Header__item'>
          {hasBigEnoughDeck ? (
            <NavLink
              to={`/deck/${id}/detail`}
              active={props.active === 'DETAIL'}
            >
              Detail
            </NavLink>
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
            <NavLink
              to={`/deck/${id}/dry-run`}
              active={props.active === 'DRY_RUN'}
            >
              Dry-run
            </NavLink>
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
              <NavLink
                to={`/deck/${id}/tracker`}
                active={props.active === 'TRACKER'}
              >
                Tracker
              </NavLink>
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
          <NavLink
            to='/deck/suggestions'
            active={props.active === 'SUGGESTIONS'}
          >
            Ready decks
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavDeckBuilder
