import React from 'react'
import NavLink from '../NavLink'

export default React.memo(function NavGuides(props) {
  return (
    <nav className='Header__nav'>
      <ul className='Header__list Header__list--sub'>
        <li className='Header__item'>
          <NavLink to='/guides' active={props.active === 'INDEX'}>
            All guides
          </NavLink>
        </li>
        <li className='Header__item'>
          <NavLink to='/guides/complete' active={props.active === 'COMPLETE'}>
            Complete
          </NavLink>
        </li>
        <li className='Header__item'>
          <NavLink to='/guides/drawing' active={props.active === 'DRAWING'}>
            Drawing
          </NavLink>
        </li>
        <li className='Header__item'>
          <NavLink to='/guides/deck' active={props.active === 'DECK'}>
            Deck Building
          </NavLink>
        </li>
        <li className='Header__item'>
          <NavLink to='/guides/resources' active={props.active === 'RESOURCES'}>
            Resources
          </NavLink>
        </li>
        <li className='Header__item'>
          <NavLink to='/guides/winter' active={props.active === 'WINTER'}>
            Winter
          </NavLink>
        </li>
        <li className='Header__item'>
          <NavLink to='/guides/pirate' active={props.active === 'PIRATE'}>
            Pirates
          </NavLink>
        </li>
        <li className='Header__item Header__item--right'>
          <NavLink to='/guides/lexicon' active={props.active === 'LEXICON'}>
            Lexicon
          </NavLink>
        </li>
      </ul>
    </nav>
  )
})
