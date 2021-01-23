import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import NavLink from '../NavLink'
import serialisation from '../../helpers/serialisation'

export default React.memo(function NavDeckBuilder(props) {
  const match = useRouteMatch()
  const id = match.params.deckId
  const deck = React.useMemo(
    () => (id ? serialisation.deck.deserialise(id).deck : []),
    [id]
  )
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
              Insights
            </NavLink>
          ) : (
            <span
              className='Header__action Header__action--disabled'
              title='Your deck is not complete'
            >
              Insights
            </span>
          )}
        </li>
        <li className='Header__item'>
          {hasBigEnoughDeck ? (
            <NavLink
              to={`/deck/${id}/dry-run`}
              active={props.active === 'DRY_RUN'}
            >
              Practice
            </NavLink>
          ) : (
            <span
              className='Header__action Header__action--disabled'
              title='Your deck is not complete'
            >
              Practice
            </span>
          )}
        </li>
      </ul>
    </nav>
  )
})
