import React from 'react'
import { Link } from '@reach/router'
import { getStrictActiveLink } from '../../helpers/getActiveLink'

const BSNav = props => (
  <nav className='Header__nav'>
    <ul className='Header__list Header__list--sub'>
      <li className='Header__item'>
        <Link
          getProps={getStrictActiveLink}
          to={props.simId ? `/sim/${props.simId}` : '/sim'}
        >
          Simulator
        </Link>
      </li>

      {props.simId && (
        <li className='Header__item'>
          <Link
            getProps={getStrictActiveLink}
            to={`/sim/${props.simId}/display`}
          >
            Display mode
          </Link>
        </li>
      )}

      <li className='Header__item  Header__item--right'>
        <Link getProps={getStrictActiveLink} to='/sim/puzzles'>
          Puzzles
        </Link>
      </li>
    </ul>
  </nav>
)

export default BSNav
