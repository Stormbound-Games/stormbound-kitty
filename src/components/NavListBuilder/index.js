import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import NavLink from '../NavLink'

export default React.memo(function NavListBuilder(props) {
  const match = useRouteMatch()
  const id = match.params.listId

  return (
    <nav className='Header__nav'>
      <ul className='Header__list Header__list--sub'>
        <li className='Header__item'>
          <NavLink
            to={id ? `/list/${id}` : '/list'}
            active={props.active === 'EDITOR'}
          >
            Editor
          </NavLink>
        </li>

        <li className='Header__item'>
          {id ? (
            <NavLink
              to={`/list/${id}/display`}
              active={props.active === 'DISPLAY'}
            >
              Display mode
            </NavLink>
          ) : (
            <span
              className='Header__action Header__action--disabled'
              title='Your list is pristine'
            >
              Display mode
            </span>
          )}
        </li>
      </ul>
    </nav>
  )
})
