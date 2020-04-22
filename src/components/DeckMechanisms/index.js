import React from 'react'
import rwc from 'random-weighted-choice'
import clone from 'lodash.clonedeep'
import { DEFAULT_MANA } from '../../constants/battle'
import arrayRandom from '../../helpers/arrayRandom'
import resolveCardForLevel from '../../helpers/resolveCardForLevel'
import resolveDeckWeight, {
  increaseCardWeight,
} from '../../helpers/resolveDeckWeight'

export default class DeckMechanisms extends React.Component {
  static defaultProps = {
    turn: 1,
  }

  constructor(props) {
    super(props)

    this.state = {
      hand: [],
      RNG: 'REGULAR',
      hasCycledThisTurn: false,
      noUnitsOnFirstTurn: true,
      specifics: { activeFrozenCores: 0, liveDawnsparks: false },
      turn: props.turn,
      mana: DEFAULT_MANA + (props.turn - 1),
      deck: resolveDeckWeight(props.deck),
      playerOrder: 'FIRST',
    }
  }

  componentDidMount() {
    this.drawHand()
  }

  drawHand = () => {
    if (this.props.mode === 'MANUAL') return

    this.draw()
    this.draw()
    this.draw()
    this.draw()
  }

  draw = specificCardId => {
    // If the hand is full, skip draw.
    if (this.state.hand.length >= 4) {
      return false
    }

    this.setState(state => {
      const newState = clone(state)

      // The available cards for draw are all the ones that are not currently
      // in the hand.
      const isAvailableForDraw = card => !state.hand.includes(card.id)
      const availableCards = state.deck.filter(isAvailableForDraw)

      // Draw a random card while taking weight into account.
      const pick = specificCardId || rwc(availableCards)

      // Put the new card into the hand.
      newState.hand.push(pick)

      // After having drawn a new card, we need to readjust the weight of all
      // cards that are not in the hand, as well as the card that has just been
      // drawn (reset to 0).
      newState.deck = this.getIncreasedDeckWeight({
        state: newState,
        reset: [pick],
      })

      return newState
    })
  }

  cycle = (id, countAsCycled = true) => {
    // If the cycled card is not actually in the hand, skip cycle.
    if (!this.state.hand.includes(id)) {
      return false
    }

    this.setState(state => {
      const newState = clone(state)

      // Remove the cycled card from the hand.
      newState.hand = state.hand.filter(cardId => cardId !== id)

      // The available cards for cycle are all the ones that are not currently
      // in the hand, and that are not the one that has been cycled. From there,
      // we can draw a random card while taking weight into account, then push
      // the new card into the hand.
      const availableCards = state.deck.filter(
        card => !state.hand.includes(card.id)
      )
      const pick = rwc(availableCards)
      newState.hand.push(pick)

      // After having drawn a new card, we need to readjust the weight of all
      // cards that are not in the hand, as well as the one that has just been
      // drawn (reset to 0).
      newState.deck = this.getIncreasedDeckWeight({
        state: newState,
        reset: [id, pick],
      })

      newState.hasCycledThisTurn = countAsCycled

      return newState
    })
  }

  play = (id, options = { free: false, discard: false }) => {
    const card = this.state.deck.find(card => card.id === id)

    // If it’s not a discard move and the card costs more mana than the current
    // round, skip play.
    if (!options.discard && !options.free && card.mana > this.state.mana) {
      return false
    }

    this.setState(
      state => {
        const newState = clone(state)

        // Remove the played card from the hand.
        newState.hand = state.hand.filter(cardId => cardId !== id)

        // If the card played is a Frozen Core, increment the amount of active
        // Frozen Cores by 1.
        if (id === 'W9') {
          newState.specifics.activeFrozenCores += 1
        }

        if (id === 'W16') {
          newState.specifics.liveDawnsparks = true
        }

        // Unless the play is actually free or a discard, decrease the amount
        // of available mana by the cost the card
        if (!(options.free || options.discard)) {
          newState.mana -= card.mana
        }

        if (state.turn === 1) {
          // Check if this card spawns units on the board, this is used to check if
          // Toxic Sacrifice can be played on this turn
          const unitSpawningSpells = ['N2', 'S24', 'F8']
          // Summon Militia, Head Start (can't occur in the game) and Rain of Frogs

          if (card.type === 'unit' || unitSpawningSpells.includes(id)) {
            newState.noUnitsOnFirstTurn = false
          }
        }
        return newState
      },
      () => this.handleCardEffect(card)
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
        const id = 'T' + arrayRandom([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
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
          (this.state.RNG === 'REGULAR' && Math.random() >= 0.5)
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
    this.setState(state => {
      const newState = clone(state)

      // Increment the current turn by 1
      newState.turn += 1

      // Reset the mana to 3 + the current turn
      newState.mana = DEFAULT_MANA + state.turn

      // Reset the cycling state
      newState.hasCycledThisTurn = false

      // Deal with active Frozen Cores depending on whether RNG is friendly,
      // unfriendly or regular
      if (state.RNG === 'UNFRIENDLY') {
        newState.specifics.activeFrozenCores -= 1
      } else if (state.RNG === 'REGULAR') {
        const { activeFrozenCores } = newState.specifics

        newState.specifics.activeFrozenCores = Array.from(
          { length: activeFrozenCores },
          _ => Math.random() >= 0.5
        ).filter(Boolean).length
      }

      // If there are some active Frozen Cores, increment the new available mana
      if (newState.specifics.activeFrozenCores > 0) {
        newState.mana += newState.specifics.activeFrozenCores * 3
      }

      if (newState.specifics.liveDawnsparks) {
        newState.mana +=
          state.RNG === 'FRIENDLY' ||
          (state.RNG === 'REGULAR' && Math.random() >= 0.5)
            ? 4
            : 0
        newState.specifics.liveDawnsparks = false
      }
      return newState
    })

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
  }

  canCardBePlayed = id => {
    const card = this.state.deck.find(card => card.id === id)
    const isAffordable = card.mana <= this.state.mana
    const unplayableSpells = ['W1', 'S10', 'N15']

    if (this.state.turn === 1) {
      if (this.state.noUnitsOnFirstTurn) {
        unplayableSpells.push('F4')
      }

      if (unplayableSpells.includes(id)) return false
    }

    return isAffordable
  }

  reset = () => {
    this.setState(
      {
        hand: [],
        RNG: 'REGULAR',
        hasCycledThisTurn: false,
        noUnitsOnFirstTurn: true,
        specifics: { activeFrozenCores: 0, liveDawnsparks: false },
        turn: this.props.turn,
        mana: DEFAULT_MANA + (this.props.turn - 1),
        deck: resolveDeckWeight(this.props.deck),
        playerOrder: 'FIRST',
      },
      this.drawHand
    )
  }

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
