import React from 'react'
import NavLink from '../NavLink'

const CollectionNav = props => (
  <nav className='Header__nav'>
    <ul className='Header__list Header__list--sub'>
      <li className='Header__item'>
        <NavLink exact to='/collection'>
          Your collection
        </NavLink>
      </li>
      <li className='Header__item'>
        <NavLink to='/collection/stats'>Stats</NavLink>
      </li>
      <li className='Header__item--right'>
        <NavLink to='/collection/books'>Books Calculator</NavLink>
      </li>
    </ul>
  </nav>
)

export default CollectionNav
