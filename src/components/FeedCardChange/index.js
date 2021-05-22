import React from 'react'
import FeedEntry from '../FeedEntry'

export default React.memo(function FeedCardChange(props) {
  const icon =
    props.type === 'INFO'
      ? 'info'
      : props.type === 'BUFF'
      ? 'arrow-up'
      : 'arrow-down'

  return (
    <FeedEntry icon={icon} date={props.date} dateFormat='LONG'>
      {props.description}.
    </FeedEntry>
  )
})
