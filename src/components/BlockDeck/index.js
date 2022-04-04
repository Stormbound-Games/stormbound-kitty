import React from 'react'
import FeaturedDeck from '~/components/FeaturedDeck'
import Spacing from '~/components/Spacing'

export default React.memo(function BlockDeck(props) {
  const date = props.value.date ? new Date(props.value.date) : null

  return (
    <Spacing bottom='LARGE'>
      <FeaturedDeck {...props.value} date={date} />
    </Spacing>
  )
})
