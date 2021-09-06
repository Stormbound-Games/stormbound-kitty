import React from 'react'
import { useFela } from 'react-fela'
import Icon from '~/components/Icon'
import Label from '~/components/Label'
import useSpacing from '~/hooks/useSpacing'
import styles from './styles'

export default React.memo(function Info(props) {
  const { css } = useFela({ withCta: Boolean(props.CTA) })
  const margin = useSpacing(props.spacing || { vertical: 'LARGE' })

  return (
    <div className={css(styles.info, margin, props.extend)}>
      <div className={css({ '> :last-child': { marginBottom: 0 } })}>
        <Label as='span' extend={styles.title}>
          {!!props.icon && <Icon extend={styles.icon} icon={props.icon} />}{' '}
          {props.title}
        </Label>
        {props.children}
      </div>
      {props.CTA && <div className={css(styles.cta)}>{props.CTA}</div>}
    </div>
  )
})
