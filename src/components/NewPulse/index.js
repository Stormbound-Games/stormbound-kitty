import React from 'react'
import { useFela } from 'react-fela'
import VisuallyHidden from '../VisuallyHidden'
import styles from './styles'

const NewPulse = props => {
  const { css } = useFela()

  return (
    <span className={css(styles.newPulse, props.extend)}>
      <VisuallyHidden>New</VisuallyHidden>
    </span>
  )
}

export default React.memo(NewPulse)
