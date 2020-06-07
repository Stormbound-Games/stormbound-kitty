import React from 'react'
import NavLink from '../NavLink'
import { CATEGORIES } from '../../constants/guides'
import useViewportWidth from '../../hooks/useViewportWidth'

export default React.memo(function NavGuides(props) {
  const viewportWidth = useViewportWidth()

  return (
    <nav className='Header__nav'>
      <ul className='Header__list Header__list--sub'>
        {Object.keys(CATEGORIES).map(category => (
          <li className='Header__item' key={category}>
            <NavLink
              to={`/guides/${CATEGORIES[category].slug}`}
              active={props.active === category}
            >
              {
                CATEGORIES[category].name[
                  viewportWidth >= 700 ? 'long' : 'short'
                ]
              }
            </NavLink>
          </li>
        ))}

        <li className='Header__item Header__item--right'>
          <NavLink to='/guides/lexicon' active={props.active === 'LEXICON'}>
            Lexicon
          </NavLink>
        </li>
      </ul>
    </nav>
  )
})
