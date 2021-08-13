import React from 'react'
import { useFela } from 'react-fela'
import Icon from '../Icon'
import VisuallyHidden from '../VisuallyHidden'
import styles from './styles'

export default React.memo(function DiamondButton({
  active,
  extend,
  label,
  ...props
}) {
  const { css } = useFela({ isActive: !!active })

  return (
    <button
      {...props}
      aria-pressed={!!active}
      className={css(styles.button, extend)}
      title={label}
    >
      <Icon icon={props.icon} />
      <VisuallyHidden>{label}</VisuallyHidden>
    </button>
  )
})
