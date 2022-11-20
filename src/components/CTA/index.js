import React from 'react'
import { useFela } from 'react-fela'
import RouterLink from 'next/link'
import styles from './styles'

export default React.memo(function CTA({
  as: Component,
  extend,
  isFullWidthOnMobile,
  isNew,
  scroll,
  ...props
}) {
  const { css } = useFela({
    isDisabled: props.disabled,
    isFullWidthOnMobile,
    isNew,
  })

  if (Component) {
    return (
      <Component {...props} className={css(styles.cta, extend)}>
        <span className={css(styles.content)}>{props.children}</span>
      </Component>
    )
  }

  return props.href ? (
    <a
      data-testid={props['data-testid']}
      href={props.href}
      className={css(styles.cta, extend)}
      target={props.target}
      rel={props.rel}
      aria-label={props['aria-label']}
      download={props.download}
    >
      <span className={css(styles.content)}>{props.children}</span>
    </a>
  ) : props.to ? (
    <RouterLink
      href={props.to}
      scroll={scroll}
      prefetch={false}
      data-testid={props['data-testid']}
      aria-label={props['aria-label']}
      className={css(styles.cta, extend)}
    >
      <span className={css(styles.content)}>{props.children}</span>
    </RouterLink>
  ) : (
    <button {...props} className={css(styles.cta, extend)}>
      <span className={css(styles.content)}>{props.children}</span>
    </button>
  )
})
