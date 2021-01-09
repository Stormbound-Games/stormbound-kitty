import React from 'react'
import Icon from '../Icon'
import { formatDate } from '../../helpers/formatDate'
import './index.css'

export default React.memo(function FeedEntry(props) {
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
              props.date.getFullYear() +
              '-' +
              String(props.date.getMonth()).padStart(2, '0')
            }
          >
            In {formatDate(props.date)}
          </time>
        ) : (
          <span className='FeedEntry__date'>{props.date}</span>
        )}
        <div className='FeedEntry__label'>{props.children}</div>
      </div>
    </div>
  )
})
