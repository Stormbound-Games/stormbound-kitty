import React from 'react'
import CardLink from '../CardLink'
import FeedEntry from '../FeedEntry'
import './index.css'

export default React.memo(function FeedCardChange(props) {
  const icon =
    props.type === 'INFO'
      ? 'info'
      : props.type === 'BUFF'
      ? 'arrow-up'
      : 'arrow-down'

  return (
    <FeedEntry
      icon={icon}
      date={props.date}
      dateFormat='LONG'
      className='FeedCardChange'
    >
      {props.author ? (
        <>
          <CardLink id={props.author} />:
        </>
      ) : null}{' '}
      {props.description}.
    </FeedEntry>
  )
})
