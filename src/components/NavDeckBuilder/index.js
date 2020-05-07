import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import NavLink from '../NavLink'
import serialisation from '../../helpers/serialisation'

export default React.memo(function NavDeckBuilder(props) {
  const match = useRouteMatch()
  const id = match.params.deckId
  const deck = id ? serialisation.deck.deserialise(id) : []
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
          {
            <span
              className='Header__link Header__link--disabled'
              title='The tracker is temporarily disabled'
            >
              Tracker
            </span>
          }
        </li>

        <li className='Header__item Header__item--right'>
          <NavLink to='/guides/deck'>Guide</NavLink>
        </li>

        <li className='Header__item'>
          <NavLink to='/deck/yours' active={props.active === 'YOURS'}>
            Your decks
          </NavLink>
        </li>

        <li className='Header__item'>
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
})
