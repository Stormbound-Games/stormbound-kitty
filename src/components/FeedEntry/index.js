import React from 'react'
import Icon from '../Icon'
import './index.css'

const formatDate = date => {
  const formatter = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
  })
  const parts = formatter.formatToParts(date)
  const month = parts[0].value
  const year = parts[2].value

  return month + ' ' + year
}

export default React.memo(function FeedEntry(props) {
  return (
    <div className='FeedEntry'>
      <span className='FeedEntry__left'>
        <Icon icon={props.icon} className='FeedEntry__icon' />
      </span>
      <div className='FeedEntry__main'>
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
        <div className='FeedEntry__label'>{props.children}</div>
      </div>
    </div>
  )
})
