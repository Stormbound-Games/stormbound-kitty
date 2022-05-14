import React from 'react'
import { useFela } from 'react-fela'
import styles from './styles'

export default React.memo(function Icon({ extend, icon, ...props }) {
  const { css } = useFela({ type: icon })

  if (!icon) return null

  return (
    <svg
      {...props}
      className={css(styles.icon, extend)}
      aria-hidden='true'
      focusable='false'
    >
      <use xlinkHref={'#sprite_svg__icon-' + icon}></use>
    </svg>
  )
})
