import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import App from '../CardBuilderApp'
import PageMeta from '../PageMeta'
import getInitialCardData from '../../helpers/getInitialCardData'
import getCardBuilderMetaTags from '../../helpers/getCardBuilderMetaTags'

export default React.memo(function CardBuilderDisplay(props) {
  const match = useRouteMatch()
  const id = match.params.cardId
  const cardData = getInitialCardData(id)

  return (
    <>
      <App cardData={cardData} cardId={id} mode='DISPLAY' />
      <PageMeta {...getCardBuilderMetaTags(cardData)} />
    </>
  )
})
