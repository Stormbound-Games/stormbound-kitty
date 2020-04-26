import React from 'react'
import NavLink from '../NavLink'

const NavGuides = React.memo(props => (
  <nav className='Header__nav'>
    <ul className='Header__list Header__list--sub'>
      <li className='Header__item'>
        <NavLink to='/guides' active={props.active === 'INDEX'}>
          All guides
        </NavLink>
      </li>
      <li className='Header__item'>
        <NavLink to='/guides/complete' active={props.active === 'COMPLETE'}>
          Complete Guide
        </NavLink>
      </li>
      <li className='Header__item'>
        <NavLink to='/guides/deck' active={props.active === 'DECK'}>
          Deck Building Guide
        </NavLink>
      </li>
      <li className='Header__item'>
        <NavLink to='/guides/winter' active={props.active === 'WINTER'}>
          Winter Guide
        </NavLink>
      </li>
      <li className='Header__item'>
        <NavLink to='/guides/pirate' active={props.active === 'PIRATE'}>
          Pirate Guide
        </NavLink>
      </li>
      <li className='Header__item Header__item--right'>
        <NavLink to='/guides/lexicon' active={props.active === 'LEXICON'}>
          Lexicon
        </NavLink>
      </li>
    </ul>
  </nav>
))

export default NavGuides
