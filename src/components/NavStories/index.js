import React from 'react'
import { useRouteMatch, useLocation } from 'react-router-dom'
import { STORY_CATEGORIES } from '../../constants/stories'
import NavLink from '../NavLink'
import useFetch from '../../hooks/useFetch'

export default React.memo(function NavStories(props) {
  const match = useRouteMatch()
  const { pathname } = useLocation()
  const { storyId: id } = match.params
  const path = '/stories/' + id + '.json'
  const { data: story = {} } = useFetch(path)
  const currentCategory = story.category || pathname.split('/').pop()

  return (
    <nav className='Header__nav'>
      <ul className='Header__list Header__list--sub'>
        {Object.keys(STORY_CATEGORIES).map(category => (
          <li className='Header__item' key={category}>
            <NavLink
              to={'/stories/' + category}
              active={currentCategory === category}
            >
              {STORY_CATEGORIES[category].shortName}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
})
