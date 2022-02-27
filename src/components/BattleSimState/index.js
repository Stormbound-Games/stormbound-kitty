import React from 'react'
import clone from 'lodash.clonedeep'
import isEqual from 'lodash.isequal'
import serialize from 'form-serialize'
import {
  DEFAULT_MANA,
  DEFAULT_CELL,
  DEFAULT_PLAYER,
  DEFAULT_BOARD,
} from '~/constants/battle'
import { DEFAULT_DECK } from '~/constants/deck'
import getInitialBattleData from '~/helpers/getInitialBattleData'
import serialization from '~/helpers/serialization'
import arrayRandom from '~/helpers/arrayRandom'

export default class BattleSimState extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      // Data from URL
      ...props.sim,

      // Local unsaved data
      activeCell: null,
      activePlayer: null,
      cardSelectValue: null,
      zoomed: null,
      history: [props.simId].filter(Boolean),
      copiedCard: null,

      // Drag and drop related state
      isDragging: false,
      dndSource: null,
      dndTarget: null,
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.registerShortcuts)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.registerShortcuts)
  }

  registerShortcuts = event => {
    const Z_KEY = 90
    const C_KEY = 67
    const V_KEY = 86
    const X_KEY = 88

    switch (event.which) {
      case Z_KEY: {
        if (!(event.metaKey || event.ctrlKey)) return

        // Remove the last entry from the history
        const history = this.state.history.slice(0, -1)
        // Retrieve the former second-to-last, now last entry to restore it
        const last = history[history.length - 1]

        if (history.length === 0) {
          return
        }

        return this.setState({
          ...getInitialBattleData(this.props.cardsIndex, last),
          history,
          undo: true,
        })
      }

      case C_KEY: {
        if (!(event.metaKey || event.ctrlKey) || !this.state.activeCell) return

        const { board, activeCell } = this.state
        const copiedCard = board[activeCell[0]][activeCell[1]]

        return this.setState({ copiedCard })
      }

      case V_KEY: {
        if (
          !(event.metaKey || event.ctrlKey) ||
          !this.state.activeCell ||
          !this.state.copiedCard
        )
          return

        const { board, activeCell, copiedCard } = this.state
        const newBoard = clone(board)

        this.copyCell(newBoard[activeCell[0]][activeCell[1]], copiedCard)

        return this.setState({
          board: newBoard,
          activePlayer: copiedCard.player,
        })
      }

      case X_KEY: {
        if (!(event.metaKey || event.ctrlKey) || !this.state.activeCell) return

        const { board, activeCell } = this.state
        const newBoard = clone(board)
        const active = newBoard[activeCell[0]][activeCell[1]]
        const copiedCard = { ...active }

        this.copyCell(active, DEFAULT_CELL)

        return this.setState({ copiedCard, board: newBoard })
      }

      default:
        return
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const hasDraggingStopped = prevState.isDragging && !this.state.isDragging
    const doesDngLookLegit = this.state.dndSource && this.state.dndTarget

    // When dragging end, and provided there is a valid source and a valid
    // target, perform board updates
    if (hasDraggingStopped && doesDngLookLegit) {
      const newBoard = clone(this.state.board)
      const { dndSource, dndTarget } = this.state
      const sourceCell = newBoard[dndSource[0]][dndSource[1]]
      const targetCell = newBoard[dndTarget[0]][dndTarget[1]]
      const targetCellCopy = { ...targetCell }
      const sourceCellCopy = { ...sourceCell }
      const areFromDifferentPlayers =
        !!sourceCell.player &&
        !!targetCell.player &&
        sourceCell.player !== targetCell.player
      const areOnTheSameColumn = dndSource[1] === dndTarget[1]
      const areFacingEachOther = Math.abs(dndSource[0] - dndTarget[0]) === 1
      const areOnTheSameRow = dndSource[0] === dndTarget[0]
      const areNextToEachOther = Math.abs(dndSource[1] - dndTarget[1]) === 1
      const areFacingCorrectDirection =
        sourceCell.player === 'RED'
          ? dndSource[0] < dndTarget[0]
          : dndSource[0] > dndTarget[0]
      const qualifiesAsSidewaysAttack = areOnTheSameRow && areNextToEachOther
      const qualifiesAsFrontAttack =
        areOnTheSameColumn && areFacingEachOther && areFacingCorrectDirection

      // If the swapped cells are filled, in next to each other and from
      // different players, it’s no longer a swap but an attack and should be
      // resolved as such
      if (
        areFromDifferentPlayers &&
        (qualifiesAsSidewaysAttack || qualifiesAsFrontAttack)
      ) {
        // If the defender has more strength than the attacker, it survives the
        // attack, although gets its strength reduced by the strength of the
        // attacker; the attacker cell gets emptied
        if (targetCell.strength > sourceCell.strength) {
          targetCell.strength -= sourceCellCopy.strength

          this.copyCell(sourceCell, DEFAULT_CELL)
        }
        // If the defender has less strength than the attacker, it dies from
        // the attack, although the attacker gets its strength reduced by the
        // strength of the defender; the attacker cell gets emptied
        // The attacker’s cell (source cell) becomes empty
        // The defender’s cell (target cell) becomes the attacker, with reduced
        // strength
        else if (targetCell.strength < sourceCell.strength) {
          this.copyCell(targetCell, sourceCellCopy)
          this.copyCell(sourceCell, DEFAULT_CELL)

          targetCell.strength =
            sourceCellCopy.strength - targetCellCopy.strength
        }
        // If the attacker and the defender have the same amount of strength,
        // they both die from the attack
        else {
          this.copyCell(targetCell, DEFAULT_CELL)
          this.copyCell(sourceCell, DEFAULT_CELL)
        }
      } else {
        // If it’s not a combat scenario, simply swap the two cells.
        this.copyCell(targetCell, sourceCellCopy)

        if (!!targetCell.card.id) {
          this.copyCell(sourceCell, targetCellCopy)
        } else {
          this.copyCell(sourceCell, DEFAULT_CELL)
        }
      }

      this.setState({
        activeCell: null,
        dndSource: null,
        dndTarget: null,
        board: newBoard,
      })
    }

    const hasManaChanged = prevState.mana !== this.state.mana
    const hasGridMarkersChanged =
      prevState.gridMarkers !== this.state.gridMarkers
    const hasBoardChanged = !isEqual(prevState.board, this.state.board)
    const haveCardsChanged = !isEqual(prevState.cards, this.state.cards)
    const hasHandChange = !isEqual(prevState.hand, this.state.hand)
    const havePlayersChanged =
      !isEqual(prevState.players.RED, this.state.players.RED) ||
      !isEqual(prevState.players.BLUE, this.state.players.BLUE)

    if (
      hasManaChanged ||
      hasGridMarkersChanged ||
      hasBoardChanged ||
      haveCardsChanged ||
      hasHandChange ||
      havePlayersChanged
    ) {
      const id = serialization.battle.serialize(
        this.state.board,
        this.state.players,
        { mana: this.state.mana, gridMarkers: this.state.gridMarkers },
        { cards: this.state.cards, hand: this.state.hand }
      )

      this.props.navigator.replace('/simulators/battle/' + id)

      // If the update was caused by an undo, do not add a new entry into the
      // history and simply mark undo as `false` for the next state update
      if (this.state.undo) {
        this.setState({ undo: false })
      } else {
        this.setState(state => ({ history: [...state.history, id].slice(-20) }))
      }
    }

    if (prevProps.mode !== this.props.mode) {
      // If the display mode has been updated, reset the zoom
      this.setState({ zoomed: null })

      // If display mode is enabled, reset local board state
      if (this.props.mode === 'DISPLAY') {
        this.setState({
          activeCell: null,
          activePlayer: null,
          cardSelectValue: null,
        })
      }
    }
  }

  copyCell = (targetCell, sourceCell) => {
    targetCell.strength = sourceCell.strength
    targetCell.level = sourceCell.level
    targetCell.player = sourceCell.player
    targetCell.card = { ...sourceCell.card }
    targetCell.poisoned = sourceCell.poisoned
    targetCell.vitalized = sourceCell.vitalized
    targetCell.frozen = sourceCell.frozen
    targetCell.confused = sourceCell.confused
    targetCell.disabled = sourceCell.disabled
  }

  updateActiveCell = ({
    strength,
    player,
    level,
    card,
    poisoned,
    vitalized,
    frozen,
    confused,
    disabled,
  }) => {
    const newBoard = clone(this.state.board)
    const cell = newBoard[this.state.activeCell[0]][this.state.activeCell[1]]

    cell.strength = +strength
    cell.level = +level
    cell.player = player
    cell.card = card
    cell.poisoned = poisoned
    cell.vitalized = vitalized
    cell.frozen = frozen
    cell.confused = confused
    cell.disabled = disabled

    this.setState({
      cardSelectValue: '',
      board: newBoard,
      activeCell: null,
    })
  }

  onUnitSubmit = event => {
    event.preventDefault()

    const formData = serialize(event.target, { hash: true })
    const card = this.props.cardsIndex[this.state.cardSelectValue]

    this.updateActiveCell({
      strength: +formData.strength,
      level: +(formData.level || 1),
      player: this.state.activePlayer,
      card: card,
      poisoned: !!formData.poisoned,
      vitalized: !!formData.vitalized,
      frozen: !!formData.frozen,
      confused: !!formData.confused,
      disabled: !!formData.disabled,
    })

    const activePlayer = this.state.players[this.state.activePlayer]

    if (activePlayer.faction === 'neutral' && card.faction !== 'neutral') {
      this.setState(state => ({
        players: {
          ...state.players,
          [state.activePlayer]: {
            ...state.players[state.activePlayer],
            faction: card.faction,
          },
        },
      }))
    }
  }

  emptyActiveCell = () => this.updateActiveCell({ ...DEFAULT_CELL })

  resetBoard = () => {
    this.setState({
      players: { RED: { ...DEFAULT_PLAYER }, BLUE: { ...DEFAULT_PLAYER } },
      board: [...DEFAULT_BOARD],
      cards: [...DEFAULT_DECK],
      hand: [],
      mana: DEFAULT_MANA,
      activeCell: null,
      activePlayer: null,
      gridMarkers: false,
      copiedCard: null,
    })
  }

  setCard =
    index =>
    ({ id, level }) => {
      this.setState(prevState => {
        const cards = [
          ...prevState.cards.slice(0, index),
          {
            id: typeof id !== 'undefined' ? id : prevState.cards[index].id,
            level:
              typeof level !== 'undefined'
                ? level
                : prevState.cards[index].level,
          },
          ...prevState.cards.slice(index + 1),
        ]

        // Make sure not to keep in hand cards that have been updated
        const hand = prevState.hand.filter(cardId =>
          cards.map(c => c.id).includes(cardId)
        )

        if (id && hand.length < 4) {
          hand.push(id)
        }

        return { cards, hand }
      })
    }

  addToHand = ({ id }) => {
    if (this.state.hand.includes(id)) {
      this.setState({ hand: this.state.hand.filter(i => i !== id) })
    } else if (this.state.hand.length < 4) {
      this.setState({ hand: [...this.state.hand, id] })
    }
  }

  onCellClick = (x, y) => event => {
    const cell = this.state.board[x][y]
    const isActiveCell =
      this.state.activeCell &&
      x === this.state.activeCell[0] &&
      y === this.state.activeCell[1]

    if (this.props.mode === 'DISPLAY') {
      if (cell.card.id) {
        this.setState({
          zoomed: {
            id: cell.card.id,
            level: cell.card.token ? cell.strength : cell.level,
            player: cell.player,
          },
        })
      }

      return
    }

    const activeCell = isActiveCell ? null : [x, y]
    const activePlayer = isActiveCell
      ? null
      : cell.card.id
      ? cell.player
      : this.state.activePlayer || 'BLUE'

    this.setState({ activeCell, activePlayer })
  }

  updateRedPlayer = redPlayer =>
    this.setState(state => ({
      players: { RED: redPlayer, BLUE: state.players.BLUE },
    }))
  updateBluePlayer = bluePlayer =>
    this.setState(state => ({
      players: { BLUE: bluePlayer, RED: state.players.RED },
    }))
  setActivePlayer = activePlayer => this.setState({ activePlayer })
  setActiveCell = activeCell => this.setState({ activeCell })
  setCardSelectValue = cardSelectValue => this.setState({ cardSelectValue })
  setIsDragging = isDragging => this.setState({ isDragging })
  setDndSource = dndSource => this.setState({ dndSource })
  setDndTarget = dndTarget => this.setState({ dndTarget })
  setMana = mana => this.setState({ mana })
  zoom = zoomed => this.setState({ zoomed })
  unzoom = () => this.setState({ zoomed: null })
  toggleGridMarkers = () =>
    this.setState(state => ({ gridMarkers: !state.gridMarkers }))

  importDeck = ({ cards, hand }) => this.setState({ cards, hand })

  getCardFromDeck = () => {
    const cardsInDeck = this.state.cards.filter(c => !!c.id)
    const draw = arrayRandom(cardsInDeck).id

    if (this.state.hand.includes(draw) || !draw) {
      return this.getCardFromDeck()
    }

    return draw
  }

  canDrawCard = () =>
    this.state.cards.filter(card => !!card.id).length > this.state.hand.length

  canCycleCard = () => this.canDrawCard() && this.state.hand.length > 0

  cycleCard = id => {
    if (!this.canCycleCard()) return

    const draw = this.getCardFromDeck()
    const hand = this.state.hand.filter(c => c !== id)

    this.setState({ hand: [...hand, draw] })
  }

  drawCard = () => {
    if (!this.canDrawCard()) return

    const draw = this.getCardFromDeck()
    const hand = this.state.hand

    this.setState({ hand: [...hand, draw] })
  }

  render() {
    return this.props.children({
      ...this.state,

      players: {
        RED: { ...this.state.players.RED, update: this.updateRedPlayer },
        BLUE: { ...this.state.players.BLUE, update: this.updateBluePlayer },
      },

      environment: this.props.environment,
      mode: this.props.mode,
      simId: this.props.simId,
      resetBoard: this.resetBoard,
      setActivePlayer: this.setActivePlayer,
      setActiveCell: this.setActiveCell,
      onCellClick: this.onCellClick,
      setMana: this.setMana,
      setCardSelectValue: this.setCardSelectValue,
      onUnitSubmit: this.onUnitSubmit,
      emptyActiveCell: this.emptyActiveCell,
      setIsDragging: this.setIsDragging,
      setDndSource: this.setDndSource,
      setDndTarget: this.setDndTarget,
      toggleGridMarkers: this.toggleGridMarkers,
      setCard: this.setCard,
      zoom: this.zoom,
      unzoom: this.unzoom,
      addToHand: this.addToHand,
      importDeck: this.importDeck,
      cycleCard: this.cycleCard,
      drawCard: this.drawCard,
      canDrawCard: this.canDrawCard(),
      canCycleCard: this.canCycleCard(),
    })
  }
}
