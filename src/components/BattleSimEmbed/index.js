import React from 'react'
import BattleSimApp from '~/components/BattleSimApp'
import BattleSimState from '~/components/BattleSimState'
import getInitialBattleData from '~/helpers/getInitialBattleData'

const BattleSimEmbed = props => (
  <BattleSimState
    environment={props.environment}
    simId={props.id}
    mode='DISPLAY'
    sim={getInitialBattleData(props.id)}
  >
    {state => <BattleSimApp {...state} />}
  </BattleSimState>
)

export default React.memo(BattleSimEmbed)
