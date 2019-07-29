import React from 'react'
import Row from '../BSRow'
import Cell from '../BSCell'
import './index.css'

const BSGrid = props => (
  <div
    className={['BSGrid', props.gridMarkers && 'BSGrid--markers']
      .filter(Boolean)
      .join(' ')}
    data-testid={props.gridMarkers ? 'board-grid-with-markers' : 'board-grid'}
  >
    {props.board.map((row, x) => (
      <Row index={x} board={props.board} key={x}>
        {row.map((cell, y) => (
          <div key={'col-' + y} className="BSGrid__cell">
            <div className="BSGrid__cell-content">
              <Cell
                {...cell}
                data-testid={`cell-${'ABCDE'[x]}${'1234'[y]}`}
                mode={props.mode}
                activePlayer={props.activePlayer}
                isActive={
                  props.activeCell &&
                  (x === props.activeCell[0] && y === props.activeCell[1])
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

export default BSGrid
