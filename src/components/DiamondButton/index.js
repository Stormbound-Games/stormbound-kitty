import React from 'react'
import { useFela } from 'react-fela'
import RouterLink from 'next/link'
import Icon from '~/components/Icon'
import VisuallyHidden from '~/components/VisuallyHidden'
import styles from './styles'

export default React.memo(function DiamondButton({
  icon,
  isActive,
  extend,
  label,
  scroll,
  ...props
}) {
  const { css } = useFela({ isActive })

  return props.to ? (
    <RouterLink href={props.to} passHref scroll={scroll} prefetch={false}>
      <a
        className={css(styles.button, extend)}
        data-testid={props['data-testid']}
        title={label}
      >
        <Icon icon={icon} />
        <VisuallyHidden>{label}</VisuallyHidden>
      </a>
    </RouterLink>
  ) : props.href ? (
    <a
      className={css(styles.button, extend)}
      data-testid={props['data-testid']}
      title={label}
      href={props.href}
    >
      <Icon icon={icon} />
      <VisuallyHidden>{label}</VisuallyHidden>
    </a>
  ) : (
    <button
      aria-pressed={isActive}
      type='button'
      {...props}
      className={css(styles.button, extend)}
      title={label}
    >
      <Icon icon={icon} />
      <VisuallyHidden>{label}</VisuallyHidden>
    </button>
  )
})
