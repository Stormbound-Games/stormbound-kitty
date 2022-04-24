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
    level: props.level,
  })
  const slug = `/cards/${props.id}`
  const label = props.children || (cardData?.name ?? null)

  if (!cardData) return label
  if (viewportWidth < 700) return <Link to={slug}>{label}</Link>

  return (
    <Tooltip label={<Card {...cardData} />} extend={{ width: '180px' }}>
      {trigger => (
        <Link {...trigger} to={slug}>
          {label}
        </Link>
      )}
    </Tooltip>
  )
})
