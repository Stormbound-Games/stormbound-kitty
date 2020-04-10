import React, { Fragment } from 'react'
import App from '../CBApp'
import PageMeta from '../PageMeta'
import getInitialCardData from '../../helpers/getInitialCardData'

const CBDisplay = props => {
  const cardData = getInitialCardData(props.cardId)

  return (
    <Fragment>
      <h1 className='visually-hidden'>Card builder</h1>

      <App {...cardData} cardId={props.cardId} mode='DISPLAY' />

      <PageMeta title={cardData.name || 'Card display'} />
    </Fragment>
  )
}

export default CBDisplay
