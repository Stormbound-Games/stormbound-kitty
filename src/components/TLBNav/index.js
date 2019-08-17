import React from 'react'
import { Link } from '@reach/router'
import { getStrictActiveLink } from '../../helpers/getActiveLink'
import { SHADES_LIST } from '../../constants/list'

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

      <li className="Header__item Header__item--right">
        <Link getProps={getStrictActiveLink} to={`/list/${SHADES_LIST}`}>
          Equals Tier List
        </Link>
      </li>
    </ul>
  </nav>
)

export default TLBNav
