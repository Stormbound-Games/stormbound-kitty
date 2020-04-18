import React from 'react'
import NavLink from '../NavLink'

const HomeNav = props => {
  return (
    <nav className='Header__nav'>
      <ul className='Header__list Header__list--sub'>
        <li className='Header__item'>
          <NavLink exact to='/'>
            News
          </NavLink>
        </li>

        <li className='Header__item'>
          <NavLink to='/brawl'>Brawl</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default HomeNav
