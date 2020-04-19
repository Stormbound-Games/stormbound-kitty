import React from 'react'
import Card from '../Card'
import Tooltip from '../Tooltip'
import resolveCardForLevel from '../../helpers/resolveCardForLevel'
import useViewportWidth from '../../hooks/useViewportWidth'

const WikiLink = props => {
  const viewportWidth = useViewportWidth()
  const cardData = resolveCardForLevel({ id: props.id, level: 1 })

  if (!cardData.id) {
    return props.children || null
  }

  const wikiURL = 'https://stormboundkingdomwars.gamepedia.com/'
  const slug = encodeURIComponent(
    cardData.name.replace(/\s/g, '_').replace(/’/g, "'")
  )

  if (viewportWidth < 700 || props.noTooltip) {
    return (
      <a href={wikiURL + slug} target='_blank' rel='noopener noreferrer'>
        {props.children || cardData.name}
      </a>
    )
  }

  return (
    <Tooltip
      label={<Card {...cardData} />}
      style={{
        width: '180px',
        backgroundColor: 'transparent',
        border: 0,
        whiteSpace: 'normal',
        animation: 'appear 300ms 500ms both',
        boxShadow: '0 0 2em 1em rgba(0, 0, 0, 0.2)',
      }}
    >
      {trigger => (
        <a
          {...trigger}
          href={wikiURL + slug}
          target='_blank'
          rel='noopener noreferrer'
        >
          {props.children || cardData.name}
        </a>
      )}
    </Tooltip>
  )
}

export default WikiLink
