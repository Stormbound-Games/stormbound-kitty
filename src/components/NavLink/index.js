import React from 'react'
import { Link } from 'react-router-dom'

export default React.memo(
  ({ active, children, to, href, onClick, target, rel, disabled }) =>
    onClick ? (
      <button
        onClick={onClick}
        disabled={disabled}
        children={children}
        className='Header__action'
      />
    ) : to ? (
      <Link
        to={to}
        children={children}
        className={['Header__action', active && 'Header__action--active']
          .filter(Boolean)
          .join(' ')}
      />
    ) : (
      <a
        href={href}
        target={target}
        rel={rel}
        children={children}
        className='Header__action'
      />
    )
)
