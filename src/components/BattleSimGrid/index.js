import React from 'react'
import { useFela } from 'react-fela'
import Cell from '../BattleSimCell'
import Row from '../BattleSimRow'
import styles from './styles'

export default React.memo(function BattleSimGrid(props) {
  const { css } = useFela({ withGridMarkes: props.gridMarkers })

  return (
    <div
      className={css(styles.grid)}
      data-testid={props.gridMarkers ? 'board-grid-with-markers' : 'board-grid'}
    >
      {props.board.map((row, x) => (
        <Row index={x} board={props.board} key={x}>
          {row.map((cell, y) => (
            <div key={'col-' + y} className={css(styles.cell({ rowIndex: x }))}>
              <div className={css(styles.cellContent)}>
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
})
