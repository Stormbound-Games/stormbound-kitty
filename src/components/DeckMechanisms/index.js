import React from 'react'
import clone from 'lodash.clonedeep'
import { DEFAULT_MANA } from '../../constants/battle'
import resolveDeckWeight from '../../helpers/resolveDeckWeight'
import canCardBePlayed from './canCardBePlayed'
import draw from './draw'
import endTurn from './endTurn'
import play, { DEFAULT_PLAY_OPTIONS } from './play'
import cycle, { DEFAULT_CYCLE_OPTIONS } from './cycle'
import getIncreasedDeckWeight from './getIncreasedDeckWeight'

const getDefaultState = props => ({
  hand: [],
  RNG: 'REGULAR',
  hasCycledThisTurn: false,
  specifics: {
    activeFrozenCores: 0,
    activeDawnsparks: 0,
    noUnitsOnFirstTurn: true,
    frozenEnemiesLevel: 0,
    emptyCellsIndicator: 4,
  },
  turn: props.turn,
  mana: DEFAULT_MANA + (props.turn - 1),
  deck: resolveDeckWeight(props.deck),
  playerOrder: 'FIRST',
  playedCards: [],
  cardsThisTurn: 0,
})

export default class DeckMechanisms extends React.Component {
  static defaultProps = {
    turn: 1,
    mode: 'AUTOMATIC',
  }

  constructor(props) {
    super(props)
    this.state = getDefaultState(props)
  }

  componentDidMount() {
    this.completeHand()
  }

  completeHand = () => {
    if (this.props.mode === 'MANUAL') return

    switch (this.state.hand.length) {
      case 3:
        this.draw()
        break
      case 2:
        this.draw()
        this.draw()
        break
      case 1:
        this.draw()
        this.draw()
        this.draw()
        break
      case 0:
        this.draw()
        this.draw()
        this.draw()
        this.draw()
        break
      default:
    }
  }

  draw = specificCardId => {
    if (this.state.hand.length < 4) {
      this.setState(state => draw(clone(state), specificCardId))
    }
  }

  cycle = (id, options = DEFAULT_CYCLE_OPTIONS) => {
    if (this.state.hand.includes(id)) {
      this.setState(state => cycle(clone(state), id, options))
    }
  }

  play = (id, options = DEFAULT_PLAY_OPTIONS) => {
    const card = this.state.deck.find(card => card.id === id)
    const canAfford = options.free || card.mana <= this.state.mana

    if (options.discard || canAfford) {
      this.setState(state =>
        play(clone(state), id, { ...options, mode: this.props.mode })
      )
    }
  }

  increaseDeckWeight = ({ reset }) =>
    this.setState(state => ({
      deck: getIncreasedDeckWeight({
        hand: state.hand,
        deck: state.deck,
        reset,
      }),
    }))

  endTurn = () =>
    this.setState(state => endTurn(clone(state)), this.completeHand)

  canCardBePlayed = id => canCardBePlayed(this.state, id)

  reset = () => this.setState(getDefaultState(this.props), this.completeHand)

  setPlayerOrder = playerOrder => {
    const turn = playerOrder === 'SECOND' ? 2 : 1

    this.setState({
      playerOrder,
      turn,
      mana: DEFAULT_MANA + (turn - 1),
    })
  }

  render() {
    return this.props.children({
      ...this.state,
      canCardBePlayed: this.canCardBePlayed,
      setPlayerOrder: this.setPlayerOrder,
      play: this.play,
      draw: this.draw,
      cycle: this.cycle,
      reset: this.reset,
      endTurn: this.endTurn,
      increaseDeckWeight: this.increaseDeckWeight,
      setRNG: RNG => this.setState({ RNG }),
    })
  }
}
