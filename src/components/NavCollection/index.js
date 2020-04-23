import React from 'react'
import NavLink from '../NavLink'

const NavCollection = props => (
  <nav className='Header__nav'>
    <ul className='Header__list Header__list--sub'>
      <li className='Header__item'>
        <NavLink to='/collection' active={props.active === 'INDEX'}>
          Your collection
        </NavLink>
      </li>
      <li className='Header__item'>
        <NavLink to='/collection/stats' active={props.active === 'STATS'}>
          Stats
        </NavLink>
      </li>
      <li className='Header__item Header__item--right'>
        <NavLink to='/collection/books' active={props.active === 'BOOKS'}>
          Books Calculator
        </NavLink>
      </li>
    </ul>
  </nav>
)

export default NavCollection
