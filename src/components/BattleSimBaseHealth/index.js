import React from 'react'
import './index.css'

const BattleSimBaseHealth = props => (
  <div className='BattleSimBaseHealth'>
    <span
      className='BattleSimBaseHealth__value'
      data-testid={`${props.player}-health`}
    >
      {props.health}
    </span>
  </div>
)

export default BattleSimBaseHealth
