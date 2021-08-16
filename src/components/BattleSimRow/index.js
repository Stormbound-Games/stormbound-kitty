import React from 'react'
import { useFela } from 'react-fela'
import findFrontRow from '~/helpers/findFrontRow'
import styles from './styles'

export default React.memo(function BattleSimRow(props) {
  const index = props.index
  const player = index === 0 ? 'RED' : index === 4 ? 'BLUE' : undefined
  const redFrontRow = findFrontRow(props.board, 'RED')
  const blueFrontRow = findFrontRow(props.board, 'BLUE')
  const frontRowIndex =
    player === 'RED'
      ? redFrontRow
      : player === 'BLUE'
      ? blueFrontRow
      : undefined
  const { css } = useFela({ frontRowIndex, player })

  return (
    <div
      data-testid='row'
      data-battle-sim-row={player ? `${player}-${frontRowIndex}` : ''}
      className={css(styles.row)}
    >
      {props.children}
    </div>
  )
})
