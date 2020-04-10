import React from 'react'
import isEqual from 'lodash.isequal'
import Board from '../BSBoardMobile'
import CellForm from '../BSCellForm'
import CardsForm from '../BSCardsForm'
import GameForm from '../BSGameForm'
import PlayerForm from '../BSPlayerForm'
import ButtonIcon from '../ButtonIcon'
import Puzzle from '../BSPuzzle'
import Panel from '../BSPanel'
import Hint from '../Hint'
import Deck from '../Deck'
import { serialiseDeck } from '../../helpers/serialise'
import './index.css'

export default class BSAppMobile extends React.Component {
  static MODES = {
    GAME: 'GAME',
    SETTINGS: 'SETTINGS',
    CELL: 'CELL',
  }

  state = { mode: BSAppMobile.MODES.GAME }

  componentDidMount() {
    this.xDown = null
    this.yDown = null

    document.addEventListener('touchstart', this.handleTouchStart, false)
    document.addEventListener('touchend', this.handleTouchMove, false)
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.activeCell &&
      !isEqual(prevProps.activeCell, this.props.activeCell)
    ) {
      this.setState({ mode: BSAppMobile.MODES.CELL })
    }
  }

  getTouches = event => {
    return event.touches || event.changedTouches || event.originalEvent.touches
  }

  handleTouchStart = event => {
    const firstTouch = this.getTouches(event)[0]

    if (['BUTTON', 'INPUT'].includes(event.target.nodeName)) {
      return
    }

    this.xDown = firstTouch.clientX
    this.yDown = firstTouch.clientY
  }

  handleTouchMove = event => {
    if (!this.xDown || !this.yDown) {
      return
    }

    const touches = event.changedTouches
    const touch = touches[touches.length - 1]

    const xUp = touch.clientX
    const yUp = touch.clientY
    const xDiff = this.xDown - xUp
    const yDiff = this.yDown - yUp

    const viewportWidth = document.documentElement.clientWidth
    const isRelevant =
      Math.abs(xDiff) > Math.abs(yDiff) && Math.abs(xDiff) > viewportWidth / 3

    if (isRelevant) {
      if (xDiff > 0) {
        this.handleLeftSwipe()
      } else {
        this.handleRightSwipe()
      }
    }

    this.xDown = null
    this.yDown = null
  }

  handleLeftSwipe = () => {
    const shouldRenderRightPanel =
      (this.props.mode === 'EDITOR' &&
        !!this.props.activePlayer &&
        !!this.props.activeCell) ||
      (this.props.mode === 'DISPLAY' && !!this.props.puzzle)

    if (this.state.mode === BSAppMobile.MODES.GAME && shouldRenderRightPanel) {
      this.setState({ mode: BSAppMobile.MODES.CELL })
    } else if (this.state.mode === BSAppMobile.MODES.SETTINGS) {
      this.setState({ mode: BSAppMobile.MODES.GAME })
    }
  }

  handleRightSwipe = () => {
    if (this.state.mode === BSAppMobile.MODES.CELL) {
      this.setState({ mode: BSAppMobile.MODES.GAME })
    } else if (
      this.state.mode === BSAppMobile.MODES.GAME &&
      this.props.shouldRenderLeftPanel
    ) {
      this.setState({ mode: BSAppMobile.MODES.SETTINGS })
    }
  }

  componentWillUnmount() {
    document.removeEventListener('touchstart', this.handleTouchStart, false)
    document.removeEventListener('touchmove', this.handleTouchMove, false)
  }

  setActivePlayer = player => {
    if (!this.props.activePlayer) {
      this.setState({ mode: BSAppMobile.MODES.GAME })
    }

    this.props.setActivePlayer(player)
  }

  onUnitSubmit = event => {
    this.props.onUnitSubmit(event)
    this.setState({ mode: BSAppMobile.MODES.GAME })
  }

  emptyActiveCell = () => {
    this.props.emptyActiveCell()
    this.setState({ mode: BSAppMobile.MODES.GAME })
  }

  render() {
    const shouldRenderRightPanel =
      (this.props.mode === 'EDITOR' &&
        !!this.props.activePlayer &&
        !!this.props.activeCell) ||
      (this.props.mode === 'DISPLAY' && !!this.props.puzzle)

    return (
      <div className={`BSAppMobile BSAppMobile--${this.state.mode}`}>
        {this.props.shouldRenderLeftPanel && (
          <div
            className={`BSAppMobile__panel BSAppMobile__panel--${BSAppMobile.MODES.SETTINGS}`}
          >
            {this.props.mode === 'EDITOR' ? (
              <Panel
                side='left'
                title='Game and turn settings'
                isMobile={true}
                isPanelOpen={this.state.mode === BSAppMobile.MODES.SETTINGS}
                closePanel={() =>
                  this.setState({ mode: BSAppMobile.MODES.GAME })
                }
                data-testid='settings-panel'
              >
                <PlayerForm
                  player='RED'
                  displayName='🔴 Red player (opponent)'
                  {...this.props.players.RED}
                />
                <PlayerForm
                  player='BLUE'
                  displayName='🔵 Blue player (you)'
                  {...this.props.players.BLUE}
                />
                <CardsForm {...this.props} />
                <GameForm {...this.props} />
              </Panel>
            ) : (
              <Panel
                side='left'
                title='Your deck'
                isMobile={true}
                isPanelOpen={this.state.mode === BSAppMobile.MODES.SETTINGS}
                closePanel={() =>
                  this.setState({ mode: BSAppMobile.MODES.GAME })
                }
                data-testid='deck-panel'
              >
                <Deck
                  deck={this.props.cards}
                  onClick={this.props.zoom}
                  onClickLabel='Enlarge card'
                />
                <Hint>
                  <a
                    href={`/deck/` + serialiseDeck(this.props.cards)}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Open deck
                  </a>{' '}
                  in deck builder.
                </Hint>
              </Panel>
            )}
          </div>
        )}

        <div className='BSAppMobile__board'>
          <Board
            {...this.props}
            openCellPanel={() =>
              this.setState({ mode: BSAppMobile.MODES.CELL })
            }
            dndProps={() => ({})}
          />

          {this.props.shouldRenderLeftPanel &&
            this.state.mode !== BSAppMobile.MODES.SETTINGS && (
              <ButtonIcon
                className='BSAppMobile__panel-button BSAppMobile__panel-button--left'
                onClick={() =>
                  this.setState({ mode: BSAppMobile.MODES.SETTINGS })
                }
                aria-label='Open settings panel'
                data-testid='settings-panel-btn'
              >
                ←
              </ButtonIcon>
            )}

          {shouldRenderRightPanel &&
            this.state.mode !== BSAppMobile.MODES.CELL && (
              <ButtonIcon
                className='BSAppMobile__panel-button BSAppMobile__panel-button--right'
                onClick={() => this.setState({ mode: BSAppMobile.MODES.CELL })}
                aria-label='Open cell panel'
                data-testid='cell-panel-btn'
              >
                →
              </ButtonIcon>
            )}
        </div>

        {shouldRenderRightPanel && (
          <div
            className={`BSAppMobile__panel BSAppMobile__panel--${BSAppMobile.MODES.CELL}`}
          >
            {this.props.mode === 'EDITOR' ? (
              <Panel
                side='right'
                title='Active cell'
                isMobile={true}
                isPanelOpen={this.state.mode === BSAppMobile.MODES.CELL}
                closePanel={() =>
                  this.setState({ mode: BSAppMobile.MODES.GAME })
                }
                data-testid='cell-panel'
              >
                {!!this.props.activePlayer && !!this.props.activeCell && (
                  <CellForm
                    {...this.props}
                    setActivePlayer={this.setActivePlayer}
                    onUnitSubmit={this.onUnitSubmit}
                    emptyActiveCell={this.emptyActiveCell}
                  />
                )}
                {(!this.props.activePlayer || !this.props.activeCell) && (
                  <Hint>Select a cell.</Hint>
                )}
              </Panel>
            ) : (
              <Panel
                title='Puzzle'
                side='right'
                isMobile
                closePanel={() =>
                  this.setState({ mode: BSAppMobile.MODES.GAME })
                }
                isPanelOpen={this.state.mode === BSAppMobile.MODES.CELL}
              >
                <Puzzle {...this.props.puzzle} noImage />
              </Panel>
            )}
          </div>
        )}
      </div>
    )
  }
}
