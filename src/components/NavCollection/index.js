import React from 'react'
import NavLink from '../NavLink'

export default React.memo(function NavCollection(props) {
  return (
    <nav className='Header__nav'>
      <ul className='Header__list Header__list--sub'>
        <li className='Header__item'>
          <NavLink to='/collection' active={props.active === 'INDEX'}>
            Your Collection
          </NavLink>
        </li>
        <li className='Header__item'>
          <NavLink to='/collection/stats' active={props.active === 'STATS'}>
            Statistics
          </NavLink>
        </li>
        <li className='Header__item Header__item--right'>
          <NavLink to='/deck/collection'>Your Decks</NavLink>
        </li>
        <li className='Header__item'>
          <NavLink to='/collection/books' active={props.active === 'BOOKS'}>
            Books Calculator
          </NavLink>
        </li>
      </ul>
    </nav>
  )
})
