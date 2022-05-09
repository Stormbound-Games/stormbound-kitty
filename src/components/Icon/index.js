import React from 'react'
import { useFela } from 'react-fela'
import styles from './styles'

export default React.memo(function Icon(props) {
  const { css } = useFela({ type: props.icon })

  return (
    <svg
      {...props}
      className={css(styles.icon, props.extend)}
      aria-hidden='true'
      focusable='false'
    >
      <use xlinkHref={'#sprite_svg__icon-' + props.icon}></use>
    </svg>
  )
})
