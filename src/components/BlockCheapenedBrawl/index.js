import React from 'react'
import BlocksRenderer from '~/components/BlocksRenderer'
import CheapenedBrawl from '~/components/CheapenedBrawl'

export default React.memo(function BlockCheapenedBrawl(props) {
  return (
    <CheapenedBrawl
      title={props.value.title}
      ratio={props.value.ratio}
      difficulty={props.value.legacy ? 'LEGACY' : undefined}
    >
      <BlocksRenderer value={props.value.content} />
    </CheapenedBrawl>
  )
})
