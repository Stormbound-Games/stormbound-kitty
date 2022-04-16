import React from 'react'
import { useFela } from 'react-fela'
import RouterLink from 'next/link'
import Icon from '~/components/Icon'
import styles from './styles'

function Link({ extend, hideNewTabIndicator, scroll, to, ...props }, ref) {
  const { css } = useFela()

  if (props.href) {
    const shouldUseNewTab = props.href.startsWith('http')

    return (
      <a
        {...props}
        ref={ref}
        className={css(styles.link, extend)}
        target={shouldUseNewTab ? '_blank' : undefined}
        rel={shouldUseNewTab ? 'noopener noreferrer' : undefined}
      >
        {props.children}
        {shouldUseNewTab && !hideNewTabIndicator && (
          <>
             {/* This is a *narrow* non-breaking space (U+202F) */}
            <Icon icon='arrow-top-right' extend={styles.newTab} />
          </>
        )}
      </a>
    )
  }

  if (to) {
    return (
      <RouterLink href={to} passHref scroll={scroll} prefetch={false}>
        <a {...props} ref={ref} className={css(styles.link, extend)}>
          {props.children}
        </a>
      </RouterLink>
    )
  }

  return (
    <button
      {...props}
      ref={ref}
      type={props.type || 'button'}
      className={css(styles.link, styles.buttonAsLink, extend)}
    >
      {props.children}
    </button>
  )
}

export default React.memo(React.forwardRef(Link))
