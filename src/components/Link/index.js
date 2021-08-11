import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

const Link = ({ inNewTab, ...props }) => {
  if (props.href) {
    return (
      <a
        {...props}
        target={inNewTab ? '_blank' : undefined}
        rel={inNewTab ? 'noopener noreferrer' : undefined}
      >
        {props.children}
      </a>
    )
  }

  if (props.to) {
    return <RouterLink {...props}>{props.children}</RouterLink>
  }

  // eslint-disable-next-line
  console.warn('Broken link', props)

  return null
}

export default React.memo(Link)
