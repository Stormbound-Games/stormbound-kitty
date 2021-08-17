import React from 'react'
import clone from 'lodash.clonedeep'
import { DEFAULT_MANA } from '~/constants/battle'
import isCard from '~/helpers/isCard'
import canCardBePlayed from '~/helpers/canCardBePlayed'
import getOpponentDeck from '~/helpers/getOpponentDeck'
import resolveDeckWeight from '~/helpers/resolveDeckWeight'
import draw from './draw'
import endTurn from './endTurn'
import play, { DEFAULT_PLAY_OPTIONS } from './play'
import cycle, { DEFAULT_CYCLE_OPTIONS } from './cycle'
import getIncreasedDeckWeight from './getIncreasedDeckWeight'

const getDefaultState = props => ({
  hand: [],
  RNG: props.RNG || 'REGULAR',
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
  equalsMode: props.equalsMode,
  modifier: props.modifier,
  opponentDeck: getOpponentDeck(props.modifier),
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

  draw = (card = null) => {
    if (this.state.hand.length < 4) {
      this.setState(state => draw(clone(state), card))
    }
  }

  cycle = (card, options = DEFAULT_CYCLE_OPTIONS) => {
    this.setState(state => cycle(clone(state), card, options))
  }

  play = (card, options = DEFAULT_PLAY_OPTIONS) => {
    const cardData = this.state.deck.find(isCard(card))
    const canAfford = options.free || cardData.mana <= this.state.mana

    // If it’s not a discard move and the card costs more mana than the current
    // round, skip play.
    if (options.discard || canAfford) {
      this.setState(state =>
        play(
          clone(state),
          card,
          { ...options, mode: this.props.mode },
          this.props.HoS
        )
      )
    }
  }

  addCardToDeck = card => {
    this.setState(state => ({ ...state, deck: [...state.deck, card] }))
  }

  increaseDeckWeight = ({ reset }) =>
    this.setState(state => ({
      deck: getIncreasedDeckWeight({
        deck: state.deck,
        hand: state.hand,
        reset,
      }),
    }))

  endTurn = () =>
    this.setState(state => endTurn(clone(state)), this.completeHand)

  canCardBePlayed = card => {
    const cardData = this.state.deck.find(isCard(card))

    return canCardBePlayed(this.state.mana, cardData, {
      turn: this.state.turn,
      noUnits: Boolean(this.state.specifics.noUnitsOnFirstTurn),
      frozenEnemies: Boolean(this.state.specifics.frozenEnemiesLevel),
      emptyCells: Boolean(this.state.specifics.emptyCellsIndicator),
    })
  }

  reset = () =>
    this.setState(
      getDefaultState({ ...this.props, RNG: this.state.RNG }),
      this.completeHand
    )

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
      addCardToDeck: this.addCardToDeck,
      increaseDeckWeight: this.increaseDeckWeight,
      setRNG: RNG => this.setState({ RNG }),
    })
  }
}
