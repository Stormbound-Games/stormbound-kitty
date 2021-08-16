import React from 'react'
import { useFela } from 'react-fela'
import RouterLink from 'next/link'
import styles from './styles'

export default React.memo(function CTA({
  as: Component,
  extend,
  scroll,
  ...props
}) {
  const { css } = useFela({ isNew: props.new, isDisabled: props.disabled })

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
      className={css(styles.cta, props.extend)}
      target={props.target}
      rel={props.rel}
      aria-label={props['aria-label']}
      download={props.download}
    >
      <span className={css(styles.content)}>{props.children}</span>
    </a>
  ) : props.to ? (
    <RouterLink href={props.to} passHref scroll={scroll}>
      <a
        data-testid={props['data-testid']}
        className={css(styles.cta, extend)}
        aria-label={props['aria-label']}
      >
        <span className={css(styles.content)}>{props.children}</span>
      </a>
    </RouterLink>
  ) : (
    <button {...props} className={css(styles.cta, extend)}>
      <span className={css(styles.content)}>{props.children}</span>
    </button>
  )
})
