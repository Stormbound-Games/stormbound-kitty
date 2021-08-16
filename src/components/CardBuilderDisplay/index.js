import React from 'react'
import App from '~/components/CardBuilderApp'
import getInitialCardData from '~/helpers/getInitialCardData'
import useQueryParams from '~/hooks/useQueryParams'

export default React.memo(function CardBuilderDisplay() {
  const { cardId: id } = useQueryParams()
  const cardData = getInitialCardData(id)

  return <App cardData={cardData} cardId={id} mode='DISPLAY' />
})
