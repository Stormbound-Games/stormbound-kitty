import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import NavLink from '../NavLink'

const NavListBuilder = React.memo(props => {
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
              className='Header__link Header__link--disabled'
              title='Your list is pristine'
            >
              Display mode
            </span>
          )}
        </li>

        <li className='Header__item Header__item--right'>
          <NavLink
            to='/list/ranked/display'
            active={props.active === 'RANKED_LIST'}
          >
            Ranked Tier List
          </NavLink>
        </li>

        <li className='Header__item'>
          <NavLink
            to='/list/equals/display'
            active={props.active === 'EQUALS_LIST'}
          >
            Equals Tier List
          </NavLink>
        </li>
      </ul>
    </nav>
  )
})

export default NavListBuilder
