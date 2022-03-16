import React from 'react'
import { CardsContext } from '~/components/CardsProvider'
import Link from '~/components/Link'
import Card from '~/components/Card'
import Tooltip from '~/components/Tooltip'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import useViewportSize from '~/hooks/useViewportSize'

export default React.memo(function CardLink(props) {
  const { viewportWidth } = useViewportSize()
  const { cardsIndex } = React.useContext(CardsContext)
  const cardData = getResolvedCardData(cardsIndex, {
    id: props.id,
    level: props.level || 1,
  })
  const slug = `/card/official/${props.id}`

  if (!cardData) {
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
        filter: 'drop-shadow(0 1em 2em #00000033)',
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
