import React from 'react'
import { useFela } from 'react-fela'
import RouterLink from 'next/link'
import Icon from '~/components/Icon'
import VisuallyHidden from '~/components/VisuallyHidden'
import styles from './styles'

export default React.memo(function DiamondButton({
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
        <Icon icon={props.icon} />
        <VisuallyHidden>{label}</VisuallyHidden>
      </a>
    </RouterLink>
  ) : (
    <button
      aria-pressed={isActive}
      {...props}
      className={css(styles.button, extend)}
      title={label}
    >
      <Icon icon={props.icon} />
      <VisuallyHidden>{label}</VisuallyHidden>
    </button>
  )
})
