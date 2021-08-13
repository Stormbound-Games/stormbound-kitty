import React from 'react'
import { useFela } from 'react-fela'
import { Link as RouterLink } from 'react-router-dom'
import Icon from '../Icon'
import styles from './styles'

export default React.memo(function Link({
  extend,
  inNewTab,
  hideNewTabIndicator,
  ...props
}) {
  const { css } = useFela()

  if (props.href) {
    const shouldUseNewTab =
      (typeof inNewTab === 'undefined' && props.href.startsWith('http')) ||
      inNewTab

    return (
      <a
        {...props}
        className={css(styles.link, extend)}
        target={shouldUseNewTab ? '_blank' : undefined}
        rel={shouldUseNewTab ? 'noopener noreferrer' : undefined}
      >
        {props.children}
        {shouldUseNewTab && !hideNewTabIndicator && (
          <Icon icon='arrow-top-right' extend={styles.newTab} />
        )}
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

  return (
    <button
      {...props}
      type={props.type || 'button'}
      className={css(styles.link, styles.buttonAsLink, extend)}
    >
      {props.children}
    </button>
  )
})
