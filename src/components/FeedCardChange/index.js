import React from 'react'
import CardLink from '../CardLink'
import FeedEntry from '../FeedEntry'
import './index.css'

const ICONS = {
  INFO: 'info',
  MIXED: 'shuffle',
  BUFF: 'arrow-up',
  NERF: 'arrow-down',
}

export default React.memo(function FeedCardChange(props) {
  return (
    <FeedEntry
      icon={ICONS[props.type]}
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
