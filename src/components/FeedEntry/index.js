import React from 'react'
import { useFela } from 'react-fela'
import Icon from '~/components/Icon'
import { formatDate, formatPreciseDate } from '~/helpers/formatDate'
import parseDate from '~/helpers/parseDate'
import styles from './styles'

const pad = value => String(value).padStart(2, '0')

export default React.memo(function FeedEntry(props) {
  const { css } = useFela()
  const isLong = props.dateFormat === 'LONG'
  const connector = isLong ? 'On' : 'In'
  const format = isLong ? formatPreciseDate : formatDate
  const date =
    typeof props.date === 'string' ? parseDate(props.date) : props.date
  const isValidDate = date instanceof Date && !isNaN(date)

  return (
    <div className={css(styles.entry, props.extend)}>
      <span className={css(styles.left)}>
        <Icon
          icon={props.icon}
          extend={styles.icon({ iconColor: props.iconColor })}
        />
      </span>
      <div className={css(styles.main)}>
        {isValidDate ? (
          <time
            className={css(styles.date)}
            dateTime={
              date.getFullYear() +
              '-' +
              pad(date.getMonth()) +
              (isLong ? '-' + pad(date.getDate()) : '')
            }
          >
            {connector} {format(date)}
          </time>
        ) : (
          <span className={css(styles.date)}>{props.date}</span>
        )}
        <div>{props.children}</div>
      </div>
      {props.right && <span className={css(styles.right)}>{props.right}</span>}
    </div>
  )
})
