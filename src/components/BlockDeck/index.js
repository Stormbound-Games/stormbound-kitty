import React from 'react'
import FeaturedDeck from '~/components/FeaturedDeck'
import Spacing from '~/components/Spacing'

export default React.memo(function BlockDeck(props) {
  return (
    <Spacing bottom='LARGE'>
      <FeaturedDeck {...props.value} />
    </Spacing>
  )
})
