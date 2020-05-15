import React from 'react'
import NavLink from '../NavLink'

export default React.memo(function NavBrawl(props) {
  return (
    <nav className='Header__nav'>
      <ul className='Header__list Header__list--sub'>
        <li className='Header__item'>
          <NavLink to='/brawl' active={props.active === 'INDEX'}>
            Brawls
          </NavLink>
        </li>

        <li className='Header__item  Header__item--right'>
          <NavLink to='/deck/suggestions?category=BRAWL'>Brawl decks</NavLink>
        </li>
      </ul>
    </nav>
  )
})
