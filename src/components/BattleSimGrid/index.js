import React from 'react'
import Row from '../BattleSimRow'
import Cell from '../BattleSimCell'
import './index.css'

const BattleSimGrid = props => (
  <div
    className={['BattleSimGrid', props.gridMarkers && 'BattleSimGrid--markers']
      .filter(Boolean)
      .join(' ')}
    data-testid={props.gridMarkers ? 'board-grid-with-markers' : 'board-grid'}
  >
    {props.board.map((row, x) => (
      <Row index={x} board={props.board} key={x}>
        {row.map((cell, y) => (
          <div key={'col-' + y} className='BattleSimGrid__cell'>
            <div className='BattleSimGrid__cell-content'>
              <Cell
                {...cell}
                data-testid={`cell-${'ABCDE'[x]}${'1234'[y]}`}
                mode={props.mode}
                activePlayer={props.activePlayer}
                isActive={
                  props.activeCell &&
                  x === props.activeCell[0] &&
                  y === props.activeCell[1]
                }
                {...props.dndProps(x, y)}
                onClick={props.onCellClick(x, y)}
              />
            </div>
          </div>
        ))}
      </Row>
    ))}
  </div>
)

export default BattleSimGrid
