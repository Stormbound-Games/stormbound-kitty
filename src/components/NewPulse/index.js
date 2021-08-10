import React from 'react'
import { useFela } from 'react-fela'
import styles from './styles'

const NewPulse = props => {
  const { css } = useFela()

  return (
    <span className={css(styles.newPulse, props.extend)}>
      <span className='VisuallyHidden'>New</span>
    </span>
  )
}

export default React.memo(NewPulse)
