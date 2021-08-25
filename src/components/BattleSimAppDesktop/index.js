import React from 'react'
import { connect } from 'react-fela'
import isEqual from 'lodash.isequal'
import Board from '~/components/BattleSimBoardDesktop'
import CardsForm from '~/components/BattleSimCardsForm'
import CellFormDialog from '~/components/BattleSimCellFormDialog'
import Deck from '~/components/Deck'
import GameForm from '~/components/BattleSimGameForm'
import PlayerForm from '~/components/BattleSimPlayerForm'
import Row from '~/components/Row'
import Spacing from '~/components/Spacing'
import Title from '~/components/Title'
import Puzzle from '~/components/BattleSimPuzzle'
import styles from './styles'

class BattleSimAppDesktop extends React.Component {
  state = {
    coords: {},
  }

  open = () => this.dialog && this.dialog.show()
  close = () => this.dialog && this.dialog.hide()

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.activeCell, this.props.activeCell)) {
      if (this.props.activeCell) {
        const node = document.querySelector(
          `[data-battle-sim-row]:nth-child(${
            this.props.activeCell[0] + 1
          }) > :nth-child(${this.props.activeCell[1] + 1})`
        )
        const coords = node.getBoundingClientRect()
        this.dialog.$el.style.left =
          window.scrollX + coords.width / 2 + coords.left + 'px'
        this.dialog.$el.style.top =
          window.scrollY + coords.height + coords.top + 'px'

        this.setState({ coords })
        this.open()
      } else {
        this.close()
      }
    }
  }

  onMouseDown = (x, y) => () => {
    // If there is a unit/structure in the current cell, enable dragging mode on
    // mouse down and set the cell coordinates as drag source
    if (!!this.props.board[x][y].card.id) {
      this.props.setIsDragging(true)
      this.props.setDndSource([x, y])
    }
  }

  onMouseUp = (x, y) => () => {
    if (!this.props.isDragging) {
      return
    }

    this.props.setIsDragging(false)
  }

  onMouseOver = (x, y) => () => {
    if (!this.props.isDragging) {
      return
    }

    this.props.setDndTarget([x, y])
  }

  dndProps = (x, y) =>
    this.props.mode === 'DISPLAY'
      ? {}
      : {
          onMouseDown: this.onMouseDown(x, y),
          onMouseOver: this.onMouseOver(x, y),
          onMouseUp: this.onMouseUp(x, y),
          isDragging: this.props.isDragging,
        }

  render() {
    return (
      <div className={this.props.styles.root}>
        <Board {...this.props} dndProps={this.dndProps} />

        {this.props.mode === 'EDITOR' && (
          <CellFormDialog
            {...this.props}
            close={this.close}
            coords={this.state.coords}
            dialogRef={dialog => (this.dialog = dialog)}
          />
        )}

        {this.props.mode === 'DISPLAY' && !!this.props.puzzle && (
          <div className={this.props.styles.puzzle}>
            <Puzzle {...this.props.puzzle} withoutLink />
          </div>
        )}

        {this.props.mode === 'DISPLAY' && (
          <div className={this.props.styles.deck}>
            <Deck
              deck={this.props.cards}
              onClick={this.props.zoom}
              onClickLabel='Enlarge card'
              showEmptySlots={false}
            />
          </div>
        )}

        {this.props.mode === 'EDITOR' && (
          <Spacing top='LARGEST'>
            <Row isDesktopOnly>
              <Row.Column width='1/3'>
                <Title>Game settings</Title>
                <GameForm {...this.props} />
              </Row.Column>

              <Row.Column width='1/3'>
                <Title>Player settings</Title>
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
              </Row.Column>

              <Row.Column width='1/3'>
                <Title>Cards settings</Title>
                <CardsForm {...this.props} />
              </Row.Column>
            </Row>
          </Spacing>
        )}
      </div>
    )
  }
}

export default connect(styles)(BattleSimAppDesktop)
