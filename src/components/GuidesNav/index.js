import React from 'react'
import { Link } from '@reach/router'
import { getStrictActiveLink } from '../../helpers/getActiveLink'

const GuidesNav = props => (
  <nav className='Header__nav'>
    <ul className='Header__list Header__list--sub'>
      <li className='Header__item'>
        <Link getProps={getStrictActiveLink} to='/guides/complete'>
          Complete Guide
        </Link>
      </li>
      <li className='Header__item'>
        <Link getProps={getStrictActiveLink} to='/guides/deck'>
          Deck Building Guide
        </Link>
      </li>
      <li className='Header__item'>
        <Link getProps={getStrictActiveLink} to='/guides/winter'>
          Winter Guide
        </Link>
      </li>
      <li className='Header__item'>
        <Link getProps={getStrictActiveLink} to='/guides/pirate'>
          Pirate Guide
        </Link>
      </li>
      <li className='Header__item Header__item--right'>
        <Link getProps={getStrictActiveLink} to='/guides/lexicon'>
          Lexicon
        </Link>
      </li>
    </ul>
  </nav>
)

export default GuidesNav
