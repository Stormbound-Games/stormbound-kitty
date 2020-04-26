import React from 'react'
import { FACTIONS } from '../../constants/game'
import NavLink from '../NavLink'
import capitalise from '../../helpers/capitalise'

const NavStories = React.memo(props => (
  <nav className='Header__nav'>
    <ul className='Header__list Header__list--sub'>
      <li className='Header__item'>
        <NavLink to='/stories' active={props.active === 'INDEX'}>
          All stories
        </NavLink>
      </li>
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
    </ul>
  </nav>
))

export default NavStories
