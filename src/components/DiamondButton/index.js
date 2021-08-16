import React from 'react'
import { useFela } from 'react-fela'
import Icon from '~/components/Icon'
import VisuallyHidden from '~/components/VisuallyHidden'
import styles from './styles'

export default React.memo(function DiamondButton({
  isActive,
  extend,
  label,
  ...props
}) {
  const { css } = useFela({ isActive })

  return (
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
