import React, { Fragment } from 'react'
import { useRouteMatch } from 'react-router-dom'
import App from '../CardBuilderApp'
import PageMeta from '../PageMeta'
import getInitialCardData from '../../helpers/getInitialCardData'

const CardBuilderDisplay = props => {
  const match = useRouteMatch()
  const id = match.params.cardId
  const cardData = getInitialCardData(id)

  return (
    <Fragment>
      <h1 className='visually-hidden'>Card builder</h1>

      <App {...cardData} cardId={id} mode='DISPLAY' />

      <PageMeta title={cardData.name || 'Card display'} />
    </Fragment>
  )
}

export default CardBuilderDisplay
