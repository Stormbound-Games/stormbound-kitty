import React from 'react'
import BlocksRenderer from '~/components/BlocksRenderer'
import Info from '~/components/Info'

export default React.memo(function BlockInfo(props) {
  return (
    <Info icon={props.value.icon} title={props.value.title}>
      <BlocksRenderer value={props.value.content} />
    </Info>
  )
})
