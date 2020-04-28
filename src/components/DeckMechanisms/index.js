import React from 'react'
import { DEFAULT_MANA } from '../../constants/battle'
import { PROBABILITIES } from '../../constants/dryRunner'
import arrayRandom from '../../helpers/arrayRandom'
import resolveCardForLevel from '../../helpers/resolveCardForLevel'
import draw from './draw'
import cycle from './cycle'
import endTurn from './endTurn'
import play from './play'
import resolveDeckWeight, {
  increaseCardWeight,
} from '../../helpers/resolveDeckWeight'

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
    if (this.props.mode === 'AUTOMATIC') this.drawHand()
  }

  drawHand = () => {
    this.draw()
    this.draw()
    this.draw()
    this.draw()
  }

  draw = specificCardId => {
    if (this.state.hand.length < 4) {
      this.setState(draw(specificCardId))
    }
  }

  cycle = (id, countAsCycled = true) => {
    if (this.state.hand.includes(id)) {
      this.setState(cycle(id, countAsCycled))
    }
  }

  play = (id, options = { free: false, discard: false }) => {
    const card = this.state.deck.find(card => card.id === id)

    // If it’s not a discard move and the card costs more mana than the current
    // round, skip play.
    if (!options.discard && !options.free && card.mana > this.state.mana) {
      return false
    }

    this.setState(
      play(id, options),
      options.discard ? undefined : () => this.handleCardEffect(card)
    )
  }

  handleCardEffect = card => {
    switch (card.id) {
      // Freebooters
      case 'N14': {
        const hand = this.state.hand.length

        if (this.props.mode !== 'MANUAL' && hand < 4) {
          this.draw()

          if (card.level >= 4 && hand < 3) {
            this.draw()
          }
        }

        break
      }

      // Rimelings
      case 'W12': {
        this.setState(state => ({ mana: state.mana + 3 }))
        break
      }

      // Gift of the Wise
      case 'W19': {
        const match = card.ability.match(/(\d+)/)
        const mana = +match[1]

        this.setState(state => ({ mana: state.mana + mana }))
        break
      }

      // Snake Eyes
      case 'N33': {
        if (this.props.mode !== 'MANUAL' && this.state.hand.length === 3) {
          this.state.hand.forEach(cardId => this.cycle(cardId, false))

          if (card.level >= 4) {
            this.draw()
          }
        }
        break
      }

      // Lady Rime
      case 'W10': {
        this.setState({ mana: 0 })
        break
      }

      // Archdruid Earyn
      case 'N48': {
        const spells = this.state.hand.filter(cardId => {
          if (cardId === 'W1') {
            return this.state.specifics.frozenEnemiesLevel !== 0
          }

          const cardInDeck = this.state.deck.find(card => card.id === cardId)
          return cardInDeck.type === 'spell'
        })

        if (this.props.mode !== 'MANUAL' && spells.length > 0) {
          this.play(spells[0], { free: true })

          if (card.level >= 4 && spells.length > 1) {
            this.play(spells[1], { free: true })
          }
        }
        break
      }

      // Collector Mirz
      case 'N8': {
        const id =
          'T' + arrayRandom([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14])
        const token = resolveCardForLevel({ id })
        token.level = [5, 6, 6, 8, 10][card.level - 1]
        token.weight = 0
        token.id = id + ':' + Math.random().toString(36).substring(7)

        this.setState(state => ({ deck: [...state.deck, token] }))
        break
      }

      // First Mutineer
      case 'N12': {
        const nonPirates = this.state.hand.filter(cardId => {
          const cardInDeck = this.state.deck.find(card => card.id === cardId)

          return cardInDeck.race !== 'pirate'
        })

        if (this.props.mode !== 'MANUAL' && nonPirates.length > 0) {
          this.play(arrayRandom(nonPirates), { discard: true })
        }
        break
      }

      // Goldgrubbers
      case 'N22': {
        const nonPirates = this.state.hand.filter(cardId => {
          const cardInDeck = this.state.deck.find(card => card.id === cardId)

          return cardInDeck.race !== 'pirate'
        })

        if (this.props.mode !== 'MANUAL' && nonPirates.length > 0) {
          this.cycle(arrayRandom(nonPirates), false)
        }
        break
      }

      // Counselor Ahmi
      case 'S3': {
        if (
          this.state.RNG === 'FRIENDLY' ||
          (this.state.RNG === 'REGULAR' &&
            Math.random() <= PROBABILITIES.AHMI_RETURNS)
        ) {
          this.setState(state => ({ hand: [...state.hand, 'S3'] }))
        }
        break
      }

      // Queen of Herds
      case 'S21': {
        const deck = [...this.state.deck]
        const inDrawPile = card => !this.state.hand.includes(card.id)
        const satyrs = deck
          .filter(inDrawPile)
          .filter(card => card.race === 'satyr')
        let satyr1, satyr2

        // If Queen of Herds is played without any satyr in the remaining cards
        // from the deck, there is nothing more to do.
        if (this.props.mode === 'MANUAL' || satyrs.length === 0) {
          break
        }

        // Pick a satyr from the remaining cards from a deck at random and play
        // it for free.
        // Note: it seems that QoH does not draw satyrs based on their weight,
        // hence the use of `arrayRandom` instead of `rwc`.
        // See: https://discordapp.com/channels/293674725069029377/564840207875178502/676580933180325920
        // Note: it seems that QoH spawns do not cause a weighing of the deck.
        // See: https://discordapp.com/channels/293674725069029377/564840207875178502/676580198057246730
        satyr1 = arrayRandom(satyrs).id
        this.play(satyr1, { free: true })

        // If Queen of Herds is level 4 or 5 and there were more than single
        // satyr in the remaining cards from the deck, a second one can be
        // picked at random and played for free.
        if (satyrs.length > 1 && card.level >= 4) {
          satyr2 = arrayRandom(satyrs.filter(satyr => satyr.id !== satyr1)).id

          if (satyr2) {
            this.play(satyr2, { free: true })
          }
        }

        break
      }

      // Spellbinder Zhevana
      case 'W8': {
        // Zhevana gains mana depending on the approximation of the number of frozen enemy units
        // on the board. The RNG appearing in the game - how many units are played in the same
        // column - is replaced by an RNG variation when units like Frosthexers or Midwinter Chaos
        // are actually played

        // Zhevana destroys some of the frozen units - the amount of remaining frozen units
        // was chosen arbitrarily and is set to 50%

        // Note: The frozenEnemiesLevel does still not indicate how many enemy frozen units there are on
        // the board - it only gives an approximation, from 0 (no) to 4 (almost all)
        this.setState(state => ({
          mana: state.mana + state.specifics.frozenEnemiesLevel * 4,
          specifics: {
            ...state.specifics,
            frozenEnemiesLevel: Math.floor(
              state.specifics.frozenEnemiesLevel / 2
            ),
          },
        }))
        break
      }

      default:
        return
    }
  }

  getIncreasedDeckWeight = ({ state = this.state, reset }) => {
    return state.deck.map(card => {
      if (state.hand.includes(card.id) && !reset.includes(card.id)) return card

      const weight = reset.includes(card.id)
        ? 0
        : increaseCardWeight(card.weight)

      return { ...card, weight }
    })
  }

  increaseDeckWeight = ({ reset }) =>
    this.setState(state => ({
      deck: this.getIncreasedDeckWeight({ state, reset }),
    }))

  endTurn = () => {
    this.setState(endTurn, () => {
      if (this.props.mode === 'MANUAL') return

      if (this.state.hand.length === 3) {
        this.draw()
      } else if (this.state.hand.length === 2) {
        this.draw()
        this.draw()
      } else if (this.state.hand.length === 1) {
        this.draw()
        this.draw()
        this.draw()
      } else if (this.state.hand.length === 0) {
        this.draw()
        this.draw()
        this.draw()
        this.draw()
      }
    })
  }

  canCardBePlayed = id => {
    const card = this.state.deck.find(card => card.id === id)
    const isAffordable = card.mana <= this.state.mana

    // This checks if a unit has been frozen this turn to allow Icicle Burst
    // to be played

    // Note: The destroying ability of Wisp Cloud is implemented: Freezing with Frosthexers will
    // make Icicle Burst playable, but playing Wisp Cloud will make it unplayable again
    if (id === 'W1' && !this.state.specifics.frozenEnemiesLevel) {
      return false
    }

    if (this.state.turn === 1) {
      // If the board is full no units/structures can be played
      // Spells that spawn units can still be played, they simply don't spawn anything
      if (!this.state.specifics.emptyCellsIndicator && card.type !== 'spell') {
        return false
      }

      // These spells can’t be played on turn 1 since they require a target
      // Icicle Burst, Broken Truce, Potion of Growth, Unhealthy Hysteria

      // Note: Checking if there are friendly units on the board to play one of these spells
      // after turn 1 is and should not be implemented, since the opponent can always play
      // Dubious Hags + Toxic Sacrifice to spawn a unit on the first turn
      const unplayableSpells = ['W1', 'S10', 'N15', 'N63']

      // Add Toxic Sacrifice to the list of unplayable spells if no unit has been played
      // or spawned on this first turn
      if (this.state.specifics.noUnitsOnFirstTurn) {
        unplayableSpells.push('F4')
      }

      if (unplayableSpells.includes(id)) return false
    }

    return isAffordable
  }

  reset = () => {
    this.setState(getDefaultState(this.props), () => {
      if (this.props.mode === 'AUTOMATIC') this.drawHand()
    })
  }

  setPlayerOrder = playerOrder => {
    const turn = playerOrder === 'SECOND' ? 2 : 1
    const mana = DEFAULT_MANA + (turn - 1)

    this.setState({ playerOrder, turn, mana })
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
