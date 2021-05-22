import React from 'react'
import Icon from '../Icon'
import { formatDate, formatPreciseDate } from '../../helpers/formatDate'
import './index.css'

const pad = value => String(value).padStart(2, '0')

export default React.memo(function FeedEntry(props) {
  const isLong = props.dateFormat === 'LONG'
  const connector = isLong ? 'On' : 'In'
  const format = isLong ? formatPreciseDate : formatDate
  const date = props.date

  return (
    <div className='FeedEntry'>
      <span className='FeedEntry__left'>
        <Icon icon={props.icon} className='FeedEntry__icon' />
      </span>
      <div className='FeedEntry__main'>
        {props.date instanceof Date ? (
          <time
            className='FeedEntry__date'
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
          <span className='FeedEntry__date'>{date}</span>
        )}
        <div className='FeedEntry__label'>{props.children}</div>
      </div>
    </div>
  )
})
