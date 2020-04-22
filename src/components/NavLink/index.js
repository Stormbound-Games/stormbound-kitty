import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const NavLink = ({ exact, ...props }) => {
  const location = useLocation()
  const classNames = [props.className, 'Header__link'].filter(Boolean)
  const re = new RegExp(props.to + '(/|$)')

  if (
    (!exact && location.pathname.match(re)) ||
    (exact && location.pathname === props.to)
  ) {
    classNames.push('Header__link--active')
  }

  return <Link {...props} className={classNames.join(' ')} />
}

export default NavLink
