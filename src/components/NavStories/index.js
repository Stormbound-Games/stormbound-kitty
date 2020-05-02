import React from 'react'
import { FACTIONS } from '../../constants/game'
import NavLink from '../NavLink'
import capitalise from '../../helpers/capitalise'

export default React.memo(function NavStories(props) {
  return (
    <nav className='Header__nav'>
      <ul className='Header__list Header__list--sub'>
        <li className='Header__item'>
          <NavLink to='/stories/lore' active={props.active === 'LORE'}>
            Lore
          </NavLink>
        </li>
        {Object.keys(FACTIONS).map(faction => (
          <li className='Header__item' key={faction}>
            <NavLink
              to={`/stories/${faction}`}
              active={props.active === faction.toUpperCase()}
            >
              {capitalise(faction)}
            </NavLink>
          </li>
        ))}
        <li className='Header__item'>
          <NavLink
            to='/stories/eastern-heat'
            active={props.active === 'EASTERN_HEAT'}
          >
            Eastern Heat
          </NavLink>
        </li>
      </ul>
    </nav>
  )
})
