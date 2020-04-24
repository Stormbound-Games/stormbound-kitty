import React from 'react'
import NavLink from '../NavLink'

const NavHome = props => {
  return (
    <nav className='Header__nav'>
      <ul className='Header__list Header__list--sub'>
        <li className='Header__item'>
          <NavLink to='/' active={props.active === 'NEWS'}>
            News
          </NavLink>
        </li>

        <li className='Header__item'>
          <NavLink to='/brawl' active={props.active === 'BRAWL'}>
            Brawl
          </NavLink>
        </li>

        <li className='Header__item'>
          <NavLink to='/fan-kit' active={props.active === 'FAN_KIT'}>
            Fan-kit
          </NavLink>
        </li>

        <li className='Header__item'>
          <NavLink to='/cards-stats' active={props.active === 'CARDS_STATS'}>
            Cards stats
          </NavLink>
        </li>

        <li className='Header__item Header__item--right'>
          <NavLink to='/faq' active={props.active === 'FAQ'}>
            FAQ
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavHome
