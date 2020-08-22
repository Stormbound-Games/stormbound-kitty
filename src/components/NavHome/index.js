import React from 'react'
import NavLink from '../NavLink'

export default React.memo(function NavHome(props) {
  return (
    <nav className='Header__nav'>
      <ul className='Header__list Header__list--sub'>
        <li className='Header__item'>
          <NavLink to='/' active={props.active === 'NEWS'}>
            News
          </NavLink>
        </li>

        <li className='Header__item'>
          <NavLink to='/fan-kit' active={props.active === 'FAN_KIT'}>
            Fan-kit
          </NavLink>
        </li>

        <li className='Header__item'>
          <NavLink
            to='/income-calculator'
            active={props.active === 'INCOME_CALC'}
          >
            Income Calc.
          </NavLink>
        </li>

        <li className='Header__item'>
          <NavLink to='/changelog' active={props.active === 'CHANGELOG'}>
            Changelog
          </NavLink>
        </li>

        <li className='Header__item'>
          <NavLink
            to='/tournaments/hall-of-fame'
            active={props.active === 'TOURNAMENTS'}
          >
            Tournaments
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
})
