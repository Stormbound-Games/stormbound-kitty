import React from 'react'
import { useFela } from 'react-fela'
import { Link } from 'react-router-dom'
import styles from './styles'

export default React.memo(({ as: Component, ...props }) => {
  const { css } = useFela({ isNew: props.new, isDisabled: props.disabled })

  if (Component) {
    return (
      <Component {...props} className={css(styles.cta, props.extend)}>
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
    <Link
      data-testid={props['data-testid']}
      to={props.to}
      className={css(styles.cta, props.extend)}
      aria-label={props['aria-label']}
    >
      <span className={css(styles.content)}>{props.children}</span>
    </Link>
  ) : (
    <button {...props} className={css(styles.cta, props.extend)}>
      <span className={css(styles.content)}>{props.children}</span>
    </button>
  )
})
