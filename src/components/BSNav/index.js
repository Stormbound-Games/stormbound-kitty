import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import NavLink from '../NavLink'

const BSNav = props => {
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

        {id && (
          <li className='Header__item'>
            <NavLink to={`/sim/${id}/display`}>Display mode</NavLink>
          </li>
        )}

        <li className='Header__item  Header__item--right'>
          <NavLink to='/sim/puzzles'>Puzzles</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default BSNav
