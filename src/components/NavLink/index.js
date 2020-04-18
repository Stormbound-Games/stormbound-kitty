import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const NavLink = ({ exact, ...props }) => {
  const location = useLocation()
  const classNames = [props.className, 'Header__link'].filter(Boolean)

  if (
    (!exact && location.pathname.startsWith(props.to)) ||
    (exact && location.pathname === props.to)
  ) {
    classNames.push('Header__link--active')
  }

  return <Link {...props} className={classNames.join(' ')} />
}

export default NavLink
