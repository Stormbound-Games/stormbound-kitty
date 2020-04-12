import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import NavLink from '../NavLink'

const BattleSimNav = props => {
  const match = useRouteMatch()
  const id = match.params.simId

  return (
    <nav className='Header__nav'>
      <ul className='Header__list Header__list--sub'>
        <li className='Header__item'>
          <NavLink exact to={id ? `/sim/${id}` : '/sim'}>
            Simulator
          </NavLink>
        </li>

        <li className='Header__item'>
          {id ? (
            <NavLink to={`/sim/${id}/display`}>Display mode</NavLink>
          ) : (
            <span
              className='Header__link Header__link--disabled'
              title='Your sim is not complete'
            >
              Display mode
            </span>
          )}
        </li>

        <li className='Header__item  Header__item--right'>
          <NavLink to='/sim/puzzles'>Puzzles</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default BattleSimNav
