import React from 'react'
import { Link } from '@reach/router'
import { getStrictActiveLink } from '../../helpers/getActiveLink'

const TLBNav = props => (
  <nav className="Header__nav">
    <ul className="Header__list Header__list--sub">
      <li className="Header__item">
        <Link
          getProps={getStrictActiveLink}
          to={props.listId ? `/list/${props.listId}` : '/list'}
        >
          Editor
        </Link>
      </li>

      {props.listId && (
        <li className="Header__item">
          <Link
            getProps={getStrictActiveLink}
            to={`/list/${props.listId}/display`}
          >
            Display mode
          </Link>
        </li>
      )}
    </ul>
  </nav>
)

export default TLBNav
