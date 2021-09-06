import React from 'react'
import { useFela } from 'react-fela'
import styles from './styles'

export default React.memo(function Label({
  as: Component = 'label',
  children,
  extend,
  ...props
}) {
  const { css } = useFela()

  return (
    <Component {...props} className={css(styles.label, extend)}>
      {children}
    </Component>
  )
})
