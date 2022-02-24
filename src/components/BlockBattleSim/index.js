import React from 'react'
import BattleSimEmbed from '~/components/BattleSimEmbed'
import BlocksRenderer from '~/components/BlocksRenderer'

export default React.memo(function BlockBattleSim(props) {
  return (
    <BattleSimEmbed id={props.value.board}>
      <BlocksRenderer value={props.value.caption} />
    </BattleSimEmbed>
  )
})
