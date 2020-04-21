import React from 'react'
import NavLink from '../NavLink'

const NavGuides = props => (
  <nav className='Header__nav'>
    <ul className='Header__list Header__list--sub'>
      <li className='Header__item'>
        <NavLink exact to='/guides'>
          All guides
        </NavLink>
      </li>
      <li className='Header__item'>
        <NavLink to='/guides/complete'>Complete Guide</NavLink>
      </li>
      <li className='Header__item'>
        <NavLink to='/guides/deck'>Deck Building Guide</NavLink>
      </li>
      <li className='Header__item'>
        <NavLink to='/guides/winter'>Winter Guide</NavLink>
      </li>
      <li className='Header__item'>
        <NavLink to='/guides/pirate'>Pirate Guide</NavLink>
      </li>
      <li className='Header__item Header__item--right'>
        <NavLink to='/guides/lexicon'>Lexicon</NavLink>
      </li>
    </ul>
  </nav>
)

export default NavGuides
