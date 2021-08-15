import React from 'react'
import App from '../CardBuilderApp'
import getInitialCardData from '../../helpers/getInitialCardData'
import useRouter from '../../hooks/useRouter'

export default React.memo(function CardBuilderDisplay(props) {
  const { params } = useRouter()
  const id = params.cardId
  const cardData = getInitialCardData(id)

  return <App cardData={cardData} cardId={id} mode='DISPLAY' />
})
