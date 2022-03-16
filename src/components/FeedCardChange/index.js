import React from 'react'
import CardLink from '~/components/CardLink'
import DiamondButton from '~/components/DiamondButton'
import FeedEntry from '~/components/FeedEntry'
import { formatPreciseDate } from '~/helpers/formatDate'

const ICONS = {
  INFO: { icon: 'info', color: 'var(--freeze)' },
  MIXED: { icon: 'shuffle', color: 'var(--confused)' },
  BUFF: { icon: 'arrow-up', color: 'var(--affordable)' },
  NERF: { icon: 'arrow-down', color: 'var(--player-red)' },
}

const pad = value => String(value).padStart(2, '0')

const Date = props => (
  <time
    dateTime={
      props.date.getFullYear() +
      '-' +
      pad(props.date.getMonth()) +
      ('-' + pad(props.date.getDate()))
    }
  >
    On {formatPreciseDate(props.date)}
  </time>
)

const Current = () => (
  <span style={{ color: 'var(--light-shadowfen)' }}>(currently displayed)</span>
)

export default React.memo(function FeedCardChange(props) {
  const isActive = props.isCurrentlyPreviewed

  return (
    <FeedEntry
      icon={ICONS[props.type].icon}
      date={
        isActive ? (
          <>
            <Date date={props.date} /> <Current />
          </>
        ) : (
          props.date
        )
      }
      dateFormat='LONG'
      iconColor={ICONS[props.type].color}
      right={
        Boolean(props.previewVersionId && props.withVersioning) && (
          <DiamondButton
            data-testid='version-btn'
            icon={isActive ? 'cross' : 'eye'}
            isActive={isActive}
            scroll={false}
            to={
              isActive
                ? `/card/official/${props.id}`
                : `/card/official/${props.id}/${props.previewVersionId}`
            }
            label={isActive ? 'Deactivate this change' : 'Preview this change'}
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
