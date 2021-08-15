import React from 'react'
import { useFela } from 'react-fela'
import Cell from '../BattleSimCell'
import Row from '../BattleSimRow'
import styles from './styles'

const GridRow = props => {
  const x = props.rowIndex
  const { css } = useFela({ withGridMarkers: props.gridMarkers, rowIndex: x })

  return (
    <Row index={x} board={props.board}>
      {props.row.map((cell, y) => (
        <div key={'col-' + y} className={css(styles.cell)}>
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
  )
}

export default React.memo(function BattleSimGrid(props) {
  const { css } = useFela()

  return (
    <div
      className={css(styles.grid)}
      data-testid={props.gridMarkers ? 'board-grid-with-markers' : 'board-grid'}
    >
      {props.board.map((row, x) => (
        <GridRow {...props} row={row} rowIndex={x} key={x} />
      ))}
    </div>
  )
})
