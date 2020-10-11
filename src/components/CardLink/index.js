import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../Card'
import Tooltip from '../Tooltip'
import getResolvedCardData from '../../helpers/getResolvedCardData'
import useViewportWidth from '../../hooks/useViewportWidth'

export default React.memo(function CardLink(props) {
  const viewportWidth = useViewportWidth()
  const cardData = getResolvedCardData({
    id: props.id,
    level: props.level || 1,
  })
  const slug = `/card/${props.id}/display`

  if (!cardData.id) {
    return props.children || null
  }

  if (viewportWidth < 700 || props.noTooltip) {
    return <Link to={slug}>{props.children || cardData.name}</Link>
  }

  return (
    <Tooltip
      label={<Card {...cardData} />}
      style={{
        width: '180px',
        backgroundColor: 'transparent',
        border: 0,
        whiteSpace: 'normal',
        boxShadow: 'none',
        filter: 'drop-shadow(0 1em 2em rgba(0, 0, 0, 0.2))',
      }}
    >
      {trigger => (
        <Link {...trigger} to={slug}>
          {props.children || cardData.name}
        </Link>
      )}
    </Tooltip>
  )
})
