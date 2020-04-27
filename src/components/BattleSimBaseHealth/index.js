import React from 'react'
import './index.css'

export default React.memo(function BattleSimBaseHealth(props) {
  return (
    <div className='BattleSimBaseHealth'>
      <span
        className='BattleSimBaseHealth__value'
        data-testid={`${props.player}-health`}
      >
        {props.health}
      </span>
    </div>
  )
})
