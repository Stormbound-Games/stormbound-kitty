import React from 'react'
import { Link } from 'react-router-dom'

export default React.memo(
  ({ active, children, to, href, onClick, target, rel }) =>
    onClick ? (
      <button onClick={onClick} children={children} className='Header__link' />
    ) : to ? (
      <Link
        to={to}
        children={children}
        className={['Header__link', active && 'Header__link--active']
          .filter(Boolean)
          .join(' ')}
      />
    ) : (
      <a
        href={href}
        target={target}
        rel={rel}
        children={children}
        className='Header__link'
      />
    )
)
