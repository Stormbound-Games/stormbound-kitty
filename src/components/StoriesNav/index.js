import React from 'react'
import { Link } from '@reach/router'
import { getStrictActiveLink } from '../../helpers/getActiveLink'
import capitalise from '../../helpers/capitalise'
import { FACTIONS } from '../../constants/game'

const StoriesNav = props => (
  <nav className='Header__nav'>
    <ul className='Header__list Header__list--sub'>
      <li className='Header__item'>
        <Link getProps={getStrictActiveLink} to={`/stories`}>
          Home
        </Link>
      </li>
      <li className='Header__item'>
        <Link getProps={getStrictActiveLink} to={`/stories/lore`}>
          Lore
        </Link>
      </li>
      {Object.keys(FACTIONS).map(faction => (
        <li className='Header__item' key={faction}>
          <Link getProps={getStrictActiveLink} to={`/stories/${faction}`}>
            {capitalise(faction)}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
)

export default StoriesNav
