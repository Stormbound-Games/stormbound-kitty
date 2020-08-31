import React from 'react'
import formatDate from '../../helpers/formatDate'
import './index.css'

export default React.memo(function Timeline(props) {
  const now = Date.now()

  return (
    <ol className='Timeline'>
      {props.items.map((item, index, items) => {
        const next = items[index + 1]
        const isPast = item.date < now
        const isCurrent = isPast && (!next || next.date > now)

        return (
          <li
            className={[
              'Timeline__item',
              isPast && !isCurrent && 'Timeline__item--past',
              isCurrent && 'Timeline__item--current',
            ]
              .filter(Boolean)
              .join(' ')}
            key={item.date}
          >
            <time className='Timeline__time' dateTime={item.date.toISOString()}>
              {formatDate(item.date)}
            </time>
            <span className='Timeline__label'>{item.title}</span>
          </li>
        )
      })}
    </ol>
  )
})
