import React from 'react'
import { useFela } from 'react-fela'
import Board from '~/components/BattleSimBoardDesktop'
import CardsForm from '~/components/BattleSimCardsForm'
import CellFormDialog from '~/components/BattleSimCellFormDialog'
import GameForm from '~/components/BattleSimGameForm'
import PlayerForm from '~/components/BattleSimPlayerForm'
import Row from '~/components/Row'
import Spacing from '~/components/Spacing'
import Title from '~/components/Title'
import Puzzle from '~/components/BattleSimPuzzle'
import styles from './styles'

export default React.memo(function BattleSimAppDesktop(props) {
  const { css } = useFela()
  const [coords, setCoords] = React.useState({})
  const dialog = React.useRef(null)
  const { setIsDragging, setDndSource, setDndTarget } = props

  React.useEffect(() => {
    if (props.activeCell && dialog.current) {
      const [y, x] = props.activeCell
      const node = document.querySelector(
        `[data-battle-sim-row]:nth-child(${y + 1}) > :nth-child(${x + 1})`
      )
      const coords = node.getBoundingClientRect()
      dialog.current.$el.style.left =
        window.scrollX + coords.width / 2 + coords.left + 'px'
      dialog.current.$el.style.top =
        window.scrollY + coords.height + coords.top + 'px'

      setCoords(coords)
      dialog.current.show()
    } else if (dialog.current) {
      dialog.current.hide()
    }
  }, [props.activeCell])

  const onMouseDown = React.useCallback(
    (x, y) => () => {
      // If there is a unit/structure in the current cell, enable dragging mode on
      // mouse down and set the cell coordinates as drag source
      if (!!props.board[x][y].card.id) {
        setIsDragging(true)
        setDndSource([x, y])
      }
    },
    [props.board, setIsDragging, setDndSource]
  )

  const onMouseUp = React.useCallback(
    (x, y) => () => {
      if (props.isDragging) setIsDragging(false)
    },
    [props.isDragging, setIsDragging]
  )

  const onMouseOver = React.useCallback(
    (x, y) => () => {
      if (props.isDragging) setDndTarget([x, y])
    },
    [props.isDragging, setDndTarget]
  )

  const dndProps = React.useCallback(
    (x, y) =>
      props.mode === 'DISPLAY'
        ? {}
        : {
            onMouseDown: onMouseDown(x, y),
            onMouseOver: onMouseOver(x, y),
            onMouseUp: onMouseUp(x, y),
            isDragging: props.isDragging,
          },
    [props.mode, props.isDragging, onMouseDown, onMouseOver, onMouseUp]
  )

  return (
    <div className={css(styles.root)}>
      <Board {...props} dndProps={dndProps} />

      {props.mode === 'EDITOR' && (
        <CellFormDialog
          {...props}
          close={() => dialog.current.hide()}
          coords={coords}
          dialogRef={instance => (dialog.current = instance)}
        />
      )}

      {props.mode === 'DISPLAY' && !!props.puzzle && (
        <div className={css(styles.puzzle)}>
          <Puzzle {...props.puzzle} withoutLink />
        </div>
      )}

      {props.mode === 'EDITOR' && (
        <Spacing top='LARGEST'>
          <Row isDesktopOnly>
            <Row.Column width='1/3'>
              <Title>Game settings</Title>
              <GameForm {...props} />
            </Row.Column>

            <Row.Column width='1/3'>
              <Title>Player settings</Title>
              <PlayerForm
                player='RED'
                displayName='🔴 Red player (opponent)'
                {...props.players.RED}
              />
              <PlayerForm
                player='BLUE'
                displayName='🔵 Blue player (you)'
                {...props.players.BLUE}
              />
            </Row.Column>

            <Row.Column width='1/3'>
              <Title>Cards settings</Title>
              <CardsForm {...props} />
            </Row.Column>
          </Row>
        </Spacing>
      )}
    </div>
  )
})
