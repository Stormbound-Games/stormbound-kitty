import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import App from '../CardBuilderApp'
import CardDisplayControls from '../CardDisplayControls'
import PageMeta from '../PageMeta'
import getInitialCardData from '../../helpers/getInitialCardData'

const CardBuilderDisplay = React.memo(props => {
  const match = useRouteMatch()
  const id = match.params.cardId
  const cardData = getInitialCardData(id)

  return (
    <>
      <h1 className='VisuallyHidden'>Card builder</h1>

      <App {...cardData} cardId={id} mode='DISPLAY' />
      <CardDisplayControls />

      <PageMeta title={cardData.name || 'Card display'} />
    </>
  )
})

export default CardBuilderDisplay
