import React from 'react'
import { useFela } from 'react-fela'
import styles from './styles'

export default React.memo(function BrawlProgressBar(props) {
  const { css } = useFela()
  const progress = Math.min((props.value / props.max) * 100, 100)

  return (
    <div className={css(styles.bar)}>
      <div
        className={css(styles.inner)}
        style={{ width: progress + '%' }}
        role='progressbar'
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-hidden
      ></div>
      <span className={css(styles.label)}>{props.label}</span>
    </div>
  )
})
