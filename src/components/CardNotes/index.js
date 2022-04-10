import React from 'react'
import BlocksRenderer from '~/components/BlocksRenderer'
import Spacing from '~/components/Spacing'
import Title from '~/components/Title'

export default React.memo(function CardNotes(props) {
  if (!props.notes) {
    return null
  }

  return (
    <Spacing vertical='LARGEST'>
      <Title>Additional notes</Title>
      <BlocksRenderer value={props.notes} />
    </Spacing>
  )
})
