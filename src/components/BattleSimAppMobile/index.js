import React from 'react'
import { useFela } from 'react-fela'
import Board from '~/components/BattleSimBoardMobile'
import DiamondButton from '~/components/DiamondButton'
import CardsForm from '~/components/BattleSimCardsForm'
import CellForm from '~/components/BattleSimCellForm'
import Deck from '~/components/Deck'
import GameForm from '~/components/BattleSimGameForm'
import Link from '~/components/Link'
import Panel from '~/components/BattleSimPanel'
import PlayerForm from '~/components/BattleSimPlayerForm'
import Puzzle from '~/components/BattleSimPuzzle'
import serialization from '~/helpers/serialization'
import styles from './styles'

const MODES = {
  GAME: 'GAME',
  SETTINGS: 'SETTINGS',
  CELL: 'CELL',
}

const getTouches = event =>
  event.touches || event.changedTouches || event.originalEvent.touches

export default React.memo(function BattleSimAppMobile(props) {
  const { css } = useFela()
  const [mode, setMode] = React.useState(MODES.GAME)
  const [down, setDown] = React.useState({ x: null, y: null })
  const { shouldRenderLeftPanel, shouldRenderRightPanel } = props

  React.useEffect(() => {
    if (!props.withoutGestures) {
      document.addEventListener('touchstart', handleTouchStart, false)
      document.addEventListener('touchend', handleTouchMove, false)

      return () => {
        document.removeEventListener('touchstart', handleTouchStart, false)
        document.removeEventListener('touchmove', handleTouchMove, false)
      }
    }
  }, [handleTouchStart, handleTouchMove, props.withoutGestures])

  React.useEffect(() => {
    if (props.activeCell) setMode(MODES.CELL)
  }, [props.activeCell])

  React.useEffect(() => {
    if (!props.activePlayer) setMode(MODES.GAME)
  }, [props.activePlayer])

  const handleTouchStart = React.useCallback(event => {
    if (!['BUTTON', 'INPUT'].includes(event.target.nodeName)) {
      const [firstTouch] = getTouches(event)
      setDown({ x: firstTouch.clientX, y: firstTouch.clientY })
    }
  }, [])

  const handleTouchMove = React.useCallback(
    event => {
      if (!down.x || !down.y) return

      const touches = event.changedTouches
      const touch = touches[touches.length - 1]
      const xDiff = down.x - touch.clientX
      const yDiff = down.y - touch.clientY
      const viewportWidth = document.documentElement.clientWidth

      if (
        Math.abs(xDiff) > Math.abs(yDiff) &&
        Math.abs(xDiff) > viewportWidth / 3
      ) {
        if (xDiff > 0) handleLeftSwipe()
        else handleRightSwipe()
      }

      setDown({ x: null, y: null })
    },
    [down, handleLeftSwipe, handleRightSwipe]
  )

  const handleLeftSwipe = React.useCallback(() => {
    if (mode === MODES.GAME && shouldRenderRightPanel) setMode(MODES.CELL)
    else if (mode === MODES.SETTINGS) setMode(MODES.GAME)
  }, [mode, shouldRenderRightPanel])

  const handleRightSwipe = React.useCallback(() => {
    if (mode === MODES.CELL) setMode(MODES.GAME)
    else if (mode === MODES.GAME && shouldRenderLeftPanel)
      setMode(MODES.SETTINGS)
  }, [mode, shouldRenderLeftPanel])

  const onUnitSubmit = event => {
    props.onUnitSubmit(event)
    setMode(MODES.GAME)
  }

  const emptyActiveCell = () => {
    props.emptyActiveCell()
    setMode(MODES.GAME)
  }

  return (
    <div className={css(styles.root)}>
      {shouldRenderLeftPanel && (
        <div
          className={css(
            styles.panel({
              type: MODES.SETTINGS,
              isActive: mode === MODES.SETTINGS,
            })
          )}
        >
          {props.mode === 'EDITOR' ? (
            <Panel
              side='left'
              title='Game settings'
              isMobile={true}
              isPanelOpen={mode === MODES.SETTINGS}
              closePanel={() => setMode(MODES.GAME)}
              data-testid='settings-panel'
            >
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
              <CardsForm {...props} />
              <GameForm {...props} />
            </Panel>
          ) : null}
        </div>
      )}

      <div className={css(styles.board)}>
        <Board
          {...props}
          openCellPanel={() => setMode(MODES.CELL)}
          dndProps={() => ({})}
        />

        {shouldRenderLeftPanel && mode !== MODES.SETTINGS && (
          <DiamondButton
            extend={styles.button({ side: 'LEFT' })}
            onClick={() => setMode(MODES.SETTINGS)}
            label='Open settings panel'
            data-testid='settings-panel-btn'
            icon='hamburger'
          />
        )}

        {shouldRenderRightPanel && mode !== MODES.CELL && (
          <DiamondButton
            extend={styles.button({ side: 'RIGHT' })}
            onClick={() => setMode(MODES.CELL)}
            label='Open cell panel'
            data-testid='cell-panel-btn'
            icon='target'
          />
        )}
      </div>

      {shouldRenderRightPanel && (
        <div
          className={css(
            styles.panel({ type: MODES.CELL, isActive: mode === MODES.CELL })
          )}
        >
          {props.mode === 'EDITOR' ? (
            <Panel
              side='right'
              title='Active cell'
              isMobile={true}
              isPanelOpen={mode === MODES.CELL}
              closePanel={() => setMode(MODES.GAME)}
              data-testid='cell-panel'
            >
              {!!props.activePlayer && !!props.activeCell && (
                <CellForm
                  {...props}
                  onUnitSubmit={onUnitSubmit}
                  emptyActiveCell={emptyActiveCell}
                />
              )}
              {(!props.activePlayer || !props.activeCell) && (
                <p>Select a cell.</p>
              )}
            </Panel>
          ) : (
            <Panel
              title='Puzzle'
              side='right'
              isMobile
              closePanel={() => setMode(MODES.GAME)}
              isPanelOpen={mode === MODES.CELL}
            >
              <Puzzle {...props.puzzle} withoutLink />
            </Panel>
          )}
        </div>
      )}
    </div>
  )
})
