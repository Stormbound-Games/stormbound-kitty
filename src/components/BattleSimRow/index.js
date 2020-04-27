import React from 'react'
import findFrontRow from '../../helpers/findFrontRow'
import './index.css'

export default React.memo(function BattleSimRow(props) {
  return (
    <div
      data-testid='row'
      className={[
        'BattleSimRow',
        props.index === 0 && 'BattleSimRow--RED',
        props.index === 0 &&
          `BattleSimRow--RED-${findFrontRow(props.board, 'RED')}`,
        props.index === 4 && 'BattleSimRow--BLUE',
        props.index === 4 &&
          `BattleSimRow--BLUE-${findFrontRow(props.board, 'BLUE')}`,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {props.children}
    </div>
  )
})
