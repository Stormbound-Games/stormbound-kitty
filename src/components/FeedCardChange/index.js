import React from 'react'
import CardLink from '~/components/CardLink'
import DiamondButton from '~/components/DiamondButton'
import FeedEntry from '~/components/FeedEntry'
import parseDate from '~/helpers/parseDate'

const ICONS = {
  INFO: { icon: 'info', color: 'var(--freeze)' },
  MIXED: { icon: 'shuffle', color: 'var(--confused)' },
  BUFF: { icon: 'arrow-up', color: 'var(--affordable)' },
  NERF: { icon: 'arrow-down', color: 'var(--player-red)' },
}

export default React.memo(function FeedCardChange(props) {
  const versionId = props.date ? parseDate(props.date).valueOf() : null
  const shouldRenderPreviewer = props.setVersionId && props.from
  const isActive = props.versionId === versionId

  return (
    <FeedEntry
      icon={ICONS[props.type].icon}
      date={props.date}
      dateFormat='LONG'
      iconColor={ICONS[props.type].color}
      right={
        shouldRenderPreviewer && (
          <DiamondButton
            icon='eye'
            isActive={isActive}
            onClick={() => props.setVersionId(isActive ? null : versionId)}
            label='Preview card *before* this change happened'
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
