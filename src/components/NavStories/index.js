import React from 'react'
import { useLocation } from 'react-router-dom'
import { STORY_CATEGORIES } from '../../constants/stories'
import NavLink from '../NavLink'

export default React.memo(function NavStories(props) {
  const { pathname } = useLocation()

  return (
    <nav className='Header__nav'>
      <ul className='Header__list Header__list--sub'>
        {Object.keys(STORY_CATEGORIES).map(category => (
          <li className='Header__item' key={category}>
            <NavLink
              to={'/stories/' + category}
              active={pathname === `/stories/${category}`}
            >
              {STORY_CATEGORIES[category].shortName}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
})
