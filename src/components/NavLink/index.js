import React from 'react'
import { Link } from 'react-router-dom'

const NavLink = ({ active, ...props }) => (
  <Link
    {...props}
    className={['Header__link', active && 'Header__link--active']
      .filter(Boolean)
      .join(' ')}
  />
)

export default NavLink
