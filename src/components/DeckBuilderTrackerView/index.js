import React from 'react'
import DeckMechanisms from '../DeckMechanisms'
import Tracker from '../Tracker'
import { STATUSES } from '../../constants/tracker'

export default props => {
  const [equalsMode, setEqualsMode] = React.useState(false)
  const deck = equalsMode
    ? props.deck.map(card => ({ ...card, level: 1 }))
    : props.deck

  return (
    <DeckMechanisms deck={deck} mode='MANUAL'>
      {state => (
        <DeckBuilderTrackerView
          {...props}
          {...state}
          equalsMode={equalsMode}
          setEqualsMode={setEqualsMode}
        />
      )}
    </DeckMechanisms>
  )
}

class DeckBuilderTrackerView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeCard: null,
      status: STATUSES.PICKING_HAND,
      // In order to start computing a reliable drawing chance, the card has to
      // be played or cycled at least once, hence maintaining an array of
      // untouched cards.
      untouchedCards: this.props.deck.map(card => card.id),
      // There is not really such thing as “cycling” given it cannot be random,
      // so this need to be maintained manually in this component as the one
      // coming from `DeckMechanisms` is always falsy.
      cycledCard: null,
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.registerShortcuts)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.registerShortcuts)
  }

  registerShortcuts = event => {
    const E_KEY = 69
    const C_KEY = 67
    const P_KEY = 80
    const numKeys = [49, 50, 51, 52]
    const padKeys = [97, 98, 99, 100]

    switch (event.which) {
      case 49:
      case 50:
      case 51:
      case 52: {
        const index = numKeys.indexOf(event.which)
        const card = this.props.hand[index]

        return this.state.status === STATUSES.PLAYING
          ? this.setState(state => ({
              activeCard: state.activeCard === card ? null : card,
            }))
          : undefined
      }
      case 97:
      case 98:
      case 99:
      case 100: {
        const index = padKeys.indexOf(event.which)
        const card = this.props.hand[index]

        return this.state.status === STATUSES.PLAYING
          ? this.setState(state => ({
              activeCard: state.activeCard === card ? null : card,
            }))
          : undefined
      }
      case P_KEY: {
        return this.state.activeCard &&
          this.props.canCardBePlayed(this.state.activeCard)
          ? this.playCard()
          : undefined
      }
      case C_KEY: {
        return this.state.activeCard && !this.state.cycledCard
          ? this.cycleCard()
          : undefined
      }
      case E_KEY: {
        return this.endTurn()
      }
      default:
        return
    }
  }

  selectCard = id => {
    // If currently in remove allowance mode, discard the selected card, mark
    // it as touched and decrease the allowance by 1
    if (typeof this.state.removeAllowance === 'number') {
      this.props.play(id, { discard: true })
      this.touchCard(id)
      this.setState(
        state => ({
          removeAllowance: state.removeAllowance - 1 || null,
        }),
        () => {
          if (
            (this.state.status === STATUSES.PLAYING_ARCHDRUID_EARYN ||
              this.state.status === STATUSES.PLAYING_FIRST_MUTINEER) &&
            !this.state.removeAllowance
          ) {
            this.setState({ status: STATUSES.PLAYING })
          }
        }
      )

      if (this.state.status === STATUSES.PLAYING_GOLDGRUBBERS_REMOVING) {
        this.setState({
          status: STATUSES.PLAYING_GOLDGRUBBERS_DRAWING,
          refillAllowance: 1,
        })
      }
    } else {
      // If not in allowance mode, toggle the active state for the card
      this.setState(state => ({
        activeCard: state.activeCard === id ? null : id,
      }))
    }
  }

  cycleCard = () => {
    this.props.play(this.state.activeCard, { discard: true })
    this.touchCard(this.state.activeCard)
    this.setState({
      status: STATUSES.CYCLING,
      activeCard: null,
      cycledCard: this.state.activeCard,
    })
  }

  touchCard = id => {
    if (!this.state.untouchedCards.includes(id)) return

    this.setState(state => ({
      untouchedCards: state.untouchedCards.filter(cardId => cardId !== id),
    }))
  }

  playCard = () => {
    const { activeCard } = this.state
    const { level } = this.props.deck.find(card => card.id === activeCard)

    // Play the current card and mark is as touched so we can start tracking its
    // drawing probability
    this.props.play(this.state.activeCard)
    this.touchCard(this.state.activeCard)
    this.setState({ activeCard: null })

    // If the card is Snake Eyes, discard all cards from the hand, and allow to
    // refill 3 or 4 based on the level of Snake Eyes.
    if (activeCard === 'N33' /* Snake Eyes */ && this.props.hand.length === 4) {
      const cardsFromHand = [...this.props.hand]
      cardsFromHand
        .filter(card => card !== activeCard)
        .forEach(card => {
          this.props.play(card, { discard: true })
          this.touchCard(card)
        })

      return this.setState({
        refillAllowance: level >= 4 ? 4 : 3,
        status: STATUSES.PLAYING_SNAKE_EYES,
      })
    }

    // If the card is Freebooters, allow to refill 1 or 2 cards based on the
    // level of Freebooters and the amount of cards in hand.
    if (activeCard === 'N14' /* Freebooters */) {
      return this.setState({
        refillAllowance: level >= 4 && this.props.hand.length <= 3 ? 2 : 1,
        status: STATUSES.PLAYING_FREEBOOTERS,
      })
    }

    if (activeCard === 'N12' /* First Mutineer */) {
      const nonPirates = this.props.hand.filter(
        cardId =>
          this.props.deck.find(card => card.id === cardId).race !== 'pirate'
      )

      if (nonPirates.length > 0) {
        if (nonPirates.length === 1) {
          this.props.play(nonPirates[0], { discard: true })
          this.touchCard(nonPirates[0])

          return this.setState({ status: STATUSES.PLAYING })
        }

        return this.setState({
          removeAllowance: 1,
          status: STATUSES.PLAYING_FIRST_MUTINEER,
        })
      }
    }

    if (activeCard === 'N22' /* Goldgrubbers */) {
      const nonPirates = this.props.hand.filter(
        cardId =>
          this.props.deck.find(card => card.id === cardId).race !== 'pirate'
      )

      if (nonPirates.length > 0) {
        if (nonPirates.length === 1) {
          this.props.play(nonPirates[0], { discard: true })
          this.touchCard(nonPirates[0])

          return this.setState({
            refillAllowance: 1,
            status: STATUSES.PLAYING_GOLDGRUBBERS_DRAWING,
          })
        }

        return this.setState({
          removeAllowance: 1,
          status: STATUSES.PLAYING_GOLDGRUBBERS_REMOVING,
        })
      }
    }

    if (activeCard === 'S21' /* Queen of Herds */) {
      const inDrawPile = card => !this.props.hand.includes(card.id)
      const satyrs = this.props.deck
        .filter(inDrawPile)
        .filter(card => card.race === 'satyr')

      if (satyrs.length > 0) {
        if (satyrs.length === 1) {
          this.props.play(satyrs[0].id, { free: true })
          this.touchCard(satyrs[0].id)
          return
        }

        if (level >= 4 && satyrs.length === 2) {
          this.props.play(satyrs[0].id, { free: true })
          this.touchCard(satyrs[0].id)
          this.props.play(satyrs[1].id, { free: true })
          this.touchCard(satyrs[1].id)
          return
        }

        this.setState({
          playAllowance: level >= 4 ? 2 : 1,
          status: STATUSES.PLAYING_QUEEN_OF_HERDS,
        })
      }
    }

    if (activeCard === 'N48' /* Archdruid Earyn */) {
      const spells = this.props.hand.filter(
        cardId =>
          this.props.deck.find(card => card.id === cardId).type === 'spell'
      )

      if (spells.length > 0) {
        if (spells.length === 1) {
          this.props.play(spells[0], { free: true })
          this.touchCard(spells[0])
          return
        }

        if (level >= 4 && spells.length === 2) {
          this.props.play(spells[0], { free: true })
          this.touchCard(spells[0])
          this.props.play(spells[1], { free: true })
          this.touchCard(spells[1])
          return
        }

        return this.setState({
          removeAllowance: level >= 4 ? 2 : 1,
          status: STATUSES.PLAYING_ARCHDRUID_EARYN,
        })
      }
    }
  }

  resetGame = () => {
    this.props.reset()
    this.setState({
      activeCard: null,
      status: STATUSES.PICKING_HAND,
      untouchedCards: this.props.deck.map(card => card.id),
    })
  }

  endTurn = () => {
    this.props.endTurn()

    // Only enter the REFILLING status if the hand is not completed at the end
    // of the turn. This is likely to be the case, except if one cannot or does
    // not play any card on a given turn.
    if (this.props.hand.length !== 4) {
      this.setState({ status: STATUSES.REFILLING })
    }

    this.setState({
      activeCard: null,
      cycledCard: null,
    })
  }

  onDeckCardClick = card => {
    switch (this.state.status) {
      // If defining the initial hand or refilling the hand at the end of a turn,
      // and currently with 3 cards in hand (therefore drawing the 4th), set the
      // status to `PLAYING`.
      case STATUSES.REFILLING:
      case STATUSES.PICKING_HAND: {
        this.props.draw(card.id)

        if (this.props.hand.length === 3) {
          this.setState({ status: STATUSES.PLAYING })
        }

        return
      }

      // If playing Queen of Herds, play the selected card for free and decrease
      // the play allowance by 1, and if no more allowance, restore the status to
      // `PLAYING`.
      case STATUSES.PLAYING_QUEEN_OF_HERDS: {
        this.props.play(card.id, { free: true })
        this.touchCard(card.id)

        return this.setState(
          state => ({
            playAllowance: state.playAllowance - 1 || null,
            status:
              state.playAllowance - 1 === 0 ? STATUSES.PLAYING : state.status,
          }),
          () => {
            if (this.state.status === STATUSES.PLAYING) {
              // @TODO: add deck weighing after Queen of Herds
              // this.props.getIncreasedDeckWeight({ set: true, reset: [card.id] })
            }
          }
        )
      }

      // When cycling, draw the card, increase the deck of the weight except for
      // the cycled and drawn cards which see their weight resetted, and resume
      // the status to `PLAYING`.
      case STATUSES.CYCLING: {
        this.props.draw(card.id)
        this.props.increaseDeckWeight({
          reset: [this.state.cycledCard, card.id],
        })
        return this.setState({ status: STATUSES.PLAYING })
      }

      default: {
        this.props.draw(card.id)

        if (typeof this.state.refillAllowance === 'number') {
          this.setState(state => ({
            refillAllowance: state.refillAllowance - 1 || null,
            status:
              state.refillAllowance - 1 === 0 || this.props.hand.length === 4
                ? STATUSES.PLAYING
                : state.status,
          }))
        }
      }
    }
  }

  render() {
    return (
      <Tracker
        {...this.props}
        {...this.state}
        onDeckCardClick={this.onDeckCardClick}
        resetGame={this.resetGame}
        endTurn={this.endTurn}
        selectCard={this.selectCard}
        playCard={this.playCard}
        cycleCard={this.cycleCard}
      />
    )
  }
}
