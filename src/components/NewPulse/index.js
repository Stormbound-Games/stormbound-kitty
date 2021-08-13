import React from 'react'
import { useFela } from 'react-fela'
import VisuallyHidden from '../VisuallyHidden'
import styles from './styles'

export default React.memo(function NewPulse(props) {
  const { css } = useFela()

  return (
    <span className={css(styles.newPulse, props.extend)}>
      <VisuallyHidden>New</VisuallyHidden>
    </span>
  )
})
