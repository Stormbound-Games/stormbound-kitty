import React from 'react'
import { useFela } from 'react-fela'
import Icon from '../Icon'
import styles from './styles'

export default React.memo(function Info(props) {
  const { css } = useFela({ withCta: Boolean(props.CTA) })

  return (
    <div
      className={[css(styles.info, props.extend), props.className]
        .filter(Boolean)
        .join(' ')}
    >
      <span className={css(styles.title)}>
        {!!props.icon && <Icon extend={styles.icon} icon={props.icon} />}{' '}
        {props.title}
      </span>
      {props.children}
      {props.CTA && <div className={css(styles.cta)}>{props.CTA}</div>}
    </div>
  )
})
