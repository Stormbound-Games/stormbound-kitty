import React from 'react'
import CheapenedBrawl from '~/components/CheapenedBrawl'

export default React.memo(function BlockCheapenedBrawl(props) {
  return (
    <CheapenedBrawl
      ratio={props.value.ratio}
      difficulty={props.value.legacy ? 'LEGACY' : undefined}
    />
  )
})
