import React from 'react'
import { useFela } from 'react-fela'
import { Link as RouterLink } from 'react-router-dom'
import styles from './styles'

const Link = ({ inNewTab, extend, ...props }) => {
  const { css } = useFela()

  if (props.href) {
    return (
      <a
        {...props}
        className={css(styles.link, extend)}
        target={inNewTab ? '_blank' : undefined}
        rel={inNewTab ? 'noopener noreferrer' : undefined}
      >
        {props.children}
      </a>
    )
  }

  if (props.to) {
    return (
      <RouterLink {...props} className={css(styles.link, extend)}>
        {props.children}
      </RouterLink>
    )
  }

  // eslint-disable-next-line
  console.warn('Broken link', props)

  return null
}

export default React.memo(Link)
