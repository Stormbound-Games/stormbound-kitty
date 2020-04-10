import React from 'react'
import { Link } from '@reach/router'
import { getStrictActiveLink } from '../../helpers/getActiveLink'

const CBNav = props => (
  <nav className='Header__nav'>
    <ul className='Header__list Header__list--sub'>
      <li className='Header__item'>
        <Link
          getProps={getStrictActiveLink}
          to={props.cardId ? `/card/${props.cardId}` : '/card'}
        >
          Editor
        </Link>
      </li>

      {props.cardId && (
        <li className='Header__item'>
          <Link
            getProps={getStrictActiveLink}
            to={`/card/${props.cardId}/display`}
          >
            Display mode
          </Link>
        </li>
      )}

      <li className='Header__item Header__item--right'>
        <Link getProps={getStrictActiveLink} to='/card/contest'>
          Card Contest
        </Link>
      </li>
    </ul>
  </nav>
)

export default CBNav
