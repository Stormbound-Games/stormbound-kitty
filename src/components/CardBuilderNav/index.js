import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import NavLink from '../NavLink'

const CardBuilderNav = props => {
  const match = useRouteMatch()
  const id = match.params.cardId

  return (
    <nav className='Header__nav'>
      <ul className='Header__list Header__list--sub'>
        <li className='Header__item'>
          <NavLink exact to={id ? `/card/${id}` : '/card'}>
            Editor
          </NavLink>
        </li>

        {id && (
          <li className='Header__item'>
            <NavLink to={`/card/${id}/display`}>Display mode</NavLink>
          </li>
        )}

        <li className='Header__item Header__item--right'>
          <NavLink to='/card/contest'>Card Contest</NavLink>
        </li>
      </ul>
    </nav>
  )
}
export default CardBuilderNav
