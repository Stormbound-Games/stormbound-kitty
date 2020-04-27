import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import NavLink from '../NavLink'

export default React.memo(function NavCardBuilder(props) {
  const match = useRouteMatch()
  const id = match.params.cardId

  return (
    <nav className='Header__nav'>
      <ul className='Header__list Header__list--sub'>
        <li className='Header__item'>
          <NavLink
            to={id ? `/card/${id}` : '/card'}
            active={props.active === 'EDITOR'}
          >
            Editor
          </NavLink>
        </li>

        <li className='Header__item'>
          {id ? (
            <NavLink
              to={`/card/${id}/display`}
              active={props.active === 'DISPLAY'}
            >
              Display mode
            </NavLink>
          ) : (
            <span
              className='Header__link Header__link--disabled'
              title='Your card is empty'
            >
              Display mode
            </span>
          )}
        </li>

        <li className='Header__item Header__item--right'>
          <NavLink to='/card/contest' active={props.active === 'CONTEST'}>
            Card Contest
          </NavLink>
        </li>
      </ul>
    </nav>
  )
})
