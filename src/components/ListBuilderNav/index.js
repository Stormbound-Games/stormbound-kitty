import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { SHADES_LIST } from '../../constants/list'
import NavLink from '../NavLink'

const ListBuilderNav = props => {
  const match = useRouteMatch()
  const id = match.params.listId

  return (
    <nav className='Header__nav'>
      <ul className='Header__list Header__list--sub'>
        <li className='Header__item'>
          <NavLink exact to={id ? `/list/${id}` : '/list'}>
            Editor
          </NavLink>
        </li>

        <li className='Header__item'>
          {id ? (
            <NavLink to={`/list/${id}/display`}>Display mode</NavLink>
          ) : (
            <span
              className='Header__link Header__link--disabled'
              title='Your list is pristine'
            >
              Display mode
            </span>
          )}
        </li>

        <li className='Header__item Header__item--right'>
          <NavLink to={`/list/${SHADES_LIST}`}>Equals Tier List</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default ListBuilderNav
