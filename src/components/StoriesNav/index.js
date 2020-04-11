import React from 'react'
import capitalise from '../../helpers/capitalise'
import { FACTIONS } from '../../constants/game'
import NavLink from '../NavLink'

const StoriesNav = props => (
  <nav className='Header__nav'>
    <ul className='Header__list Header__list--sub'>
      <li className='Header__item'>
        <NavLink exact to='/stories'>
          Home
        </NavLink>
      </li>
      <li className='Header__item'>
        <NavLink to='/stories/lore'>Lore</NavLink>
      </li>
      {Object.keys(FACTIONS).map(faction => (
        <li className='Header__item' key={faction}>
          <NavLink to={`/stories/${faction}`}>{capitalise(faction)}</NavLink>
        </li>
      ))}
    </ul>
  </nav>
)

export default StoriesNav
