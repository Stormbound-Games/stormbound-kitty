import React from 'react'
import findFrontRow from '../../helpers/findFrontRow'
import './index.css'

const BattleSimRow = React.memo(props => (
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
))

export default BattleSimRow
