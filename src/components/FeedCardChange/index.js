import React from 'react'
import CardLink from '../CardLink'
import DiamondButton from '../DiamondButton'
import FeedEntry from '../FeedEntry'
import parseDate from '../../helpers/parseDate'
import './index.css'

const ICONS = {
  INFO: 'info',
  MIXED: 'shuffle',
  BUFF: 'arrow-up',
  NERF: 'arrow-down',
}

export default React.memo(function FeedCardChange(props) {
  const versionId = props.date ? parseDate(props.date).valueOf() : null
  const shouldRenderPreviewer = props.setVersionId && props.from
  const isActive = props.versionId === versionId

  return (
    <FeedEntry
      icon={ICONS[props.type]}
      date={props.date}
      dateFormat='LONG'
      className='FeedCardChange'
      right={
        shouldRenderPreviewer && (
          <DiamondButton
            icon='eye'
            active={isActive}
            onClick={() => props.setVersionId(isActive ? null : versionId)}
            aria-label='Preview card *before* this change happened'
            title='Preview card *before* this change happened'
          />
        )
      }
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
