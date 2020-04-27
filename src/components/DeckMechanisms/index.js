import React from 'react'
import rwc from 'random-weighted-choice'
import clone from 'lodash.clonedeep'
import { DEFAULT_MANA } from '../../constants/battle'
import { PROBABILITIES } from '../../constants/dryRunner'
import arrayRandom from '../../helpers/arrayRandom'
import resolveCardForLevel from '../../helpers/resolveCardForLevel'
import getBinomialRandomVariableResult from '../../helpers/getBinomialRandomVariableResult'
import resolveDeckWeight, {
  increaseCardWeight,
} from '../../helpers/resolveDeckWeight'
import cards from '../../../src/data/cards'

const FROZEN_ENEMIES_AFTER = {
  //Frozen enemies left after a card's ability has been resolved, in regular RNG mode

  // Frosthexers
  W2: [1, 2, 3, 3, 4],
  // Moment’s Peace
  W6: [2, 3, 3, 4, 4],
  // Midwinter Chaos
  W11: [3, 3, 3, 2, 1],
  // Wisp Cloud
  W4: [0, 0, 0, 1, 2],
}

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

      // Goldgrubbers’ and Snake Eyes’ abilities should not
      // be counted as cycling, since they only replace the cards
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

        if (options.discard) {
          return newState
        }

        // Log card being played
        newState.playedCards = [card, ...state.playedCards]

        // Turn one: Check if board is not full (by Rain of Frogs for example)
        if (state.turn === 1) {
          // Any 3 mana card can be played since it would be the only one to be played
          // and would not fill the board by itself. Collector Mirz creating a 0 mana
          // token is not an issue for board filling.

          // Any 2 mana card will have to be played together with a 1 mana card. This will cause a board filling
          // issue only when this card is Rain of Frogs

          // The remaining playable cards are Green Prototypes, Summon Militia, Toxic Sacrifice and Rain of Frogs
          // In these cases only the emptyCellsIndicator variable represents how many cells are free
          // In the other cases it is not needed and will never be set to 0
          const { emptyCellsIndicator } = newState.specifics

          switch (card.id.split('#')[0]) {
            case 'N1':
              // Green Prototypes necessarily advance the frontline (since only the four 1 mana cards are
              // taken into account)
              newState.specifics.emptyCellsIndicator += 4
              break
            case 'N2':
              // Summon Militia won't cause any board filling issues
              newState.specifics.emptyCellsIndicator = Math.max(
                emptyCellsIndicator - 1,
                0
              )
              break
            case 'F4':
              // Toxic Sacrifice frees up at least one cell
              newState.specifics.emptyCellsIndicator += 1
              break
            case 'F8':
              // Rain of Frogs
              const frogs = [4, 5, 5, 6, 6]
              newState.specifics.emptyCellsIndicator = Math.max(
                emptyCellsIndicator - frogs[card.level - 1],
                0
              )
              break
            default:
              // All the other cards don’t have an effect on board filling
              break
          }
        }

        switch (id.split('#')[0]) {
          case 'W9':
            // If the card played is a Frozen Core, increment the amount of active
            // Frozen Cores by 1.
            newState.specifics.activeFrozenCores += 1
            break
          case 'W16':
            newState.specifics.activeDawnsparks += 1
            break
          case 'W1':
            // Icicle Burst should destroy the frozen enemy unit if there is only one on the board
            if (state.specifics.frozenEnemiesLevel === 1) {
              newState.specifics.frozenEnemiesLevel = 0
            }
            break
          case 'W2':
          case 'W6':
          case 'W11':
          case 'W4':
            // Find how many frozen enemies there are on the board
            // This is not a precise number but gives an approximation
            // (one, a few, many, all) of this amount
            // Based on this approximation and the card that has just
            // been played, store how many frozen enemies stayed on the board

            // For example, playing Midwinter Chaos (W11) will freeze a lot of units,
            // but if there are already many frozen units on the board, it will generally destroy them
            const frozenEnemiesNowRegular =
              FROZEN_ENEMIES_AFTER[id][state.specifics.frozenEnemiesLevel]

            // If the RNG is friendly to the user, the enemy units were spawned  in such a way
            // that an additional unit gets frozen every time a freezing card is played
            if (this.state.RNG === 'FRIENDLY') {
              newState.specifics.frozenEnemiesLevel = Math.min(
                frozenEnemiesNowRegular + 1,
                4
              )
            }
            // If the RNG is unfriendly to the user, the opposite happens: Freezing cards are not as
            // efficient and less enemy units get frozen
            else if (this.state.RNG === 'UNFRIENDLY') {
              newState.specifics.frozenEnemiesLevel = Math.max(
                frozenEnemiesNowRegular - 1,
                0
              )
            }
            // In the regular case, just store the new approximation in the specifics.frozenEnemiesLevel
            // variable
            else {
              newState.specifics.frozenEnemiesLevel = frozenEnemiesNowRegular
            }
            break
          default:
            break
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
            newState.specifics.noUnitsOnFirstTurn = false
          }
        }
        return newState
      },
      options.discard ? undefined : () => this.handleCardEffect(card)
    )
  }

  handleCardEffect = card => {
    switch (card.id.split('#')[0]) {
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
        token.rarity = null
        token.weight = 0
        token.id =
          id + '#' + this.state.deck.filter(card => card.id === id).length

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

      case 'N38': {
        const id = arrayRandom(
          cards
            .filter(card => card.type === 'unit' && card.id !== 'T12')
            .map(card => card.id)
        )
        const copiedCard = resolveCardForLevel({ id })
        copiedCard.level = Math.floor(Math.random() * 5) + 1

        copiedCard.weight = 0
        copiedCard.id =
          id + '#' + this.state.deck.filter(card => card.id === id).length

        this.setState(state => ({ deck: [...state.deck, copiedCard] }))
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

  resolveManaRNG = state => {
    // Handle the RNG for Frozen Core and Dawnsparks

    // If the RNG is unfriendly to the user, Frozen Cores and Dawsparks always get destroyed

    // If the RNG is friendly to the user, no Frozen Cores and Dawsparks get destroyed and all
    // the Dawnsparks units hit an enemy unit, giving 4 mana each

    // If the RNG is set to regular, each Frozen Core has a 50% chance of staying on the board
    // (given by FROZEN_CORE_STAYS) and Dawnsparks units each have a 71% chance (DAWNSPARKS_STAYS)
    // of staying on the board, followed by a 71% chance (DAWSPARKS_HITS) of hitting an enemy unit,
    // giving 4 mana
    switch (this.state.RNG) {
      case 'UNFRIENDLY': {
        state.specifics.activeFrozenCores = 0
        state.specifics.activeDawnsparks = 0
        break
      }

      case 'REGULAR': {
        const { activeFrozenCores, activeDawnsparks } = state.specifics

        // Choose how many Frozen Cores survive
        state.specifics.activeFrozenCores = getBinomialRandomVariableResult(
          activeFrozenCores,
          PROBABILITIES.FROZEN_CORE_STAYS
        )

        // Choose how many Dawnsparks units survive
        state.specifics.activeDawnsparks = getBinomialRandomVariableResult(
          activeDawnsparks,
          PROBABILITIES.DAWNSPARKS_STAYS
        )

        // Add mana from remaining Frozen Cores
        state.mana += state.specifics.activeFrozenCores * 3

        // Choose how many Dawnspark units hit and add mana to total
        state.mana +=
          getBinomialRandomVariableResult(
            state.specifics.activeDawnsparks,
            PROBABILITIES.DAWNSPARKS_HITS
          ) * 4
        break
      }

      case 'FRIENDLY':
      default:
        state.mana += state.specifics.activeFrozenCores * 3
        state.mana += state.specifics.activeDawnsparks * 4
        break
    }
  }

  endTurn = () => {
    this.setState(state => {
      const newState = clone(state)

      // Increment the current turn by 1
      newState.turn += 1

      // Reset the mana to 3 + the current turn
      newState.mana = DEFAULT_MANA + state.turn

      // Reset the cycling state and potential frozen enemies
      newState.hasCycledThisTurn = false
      newState.specifics.frozenEnemiesLevel = 0

      // Resolve mana from Dawnsparks/Frozen Cores
      this.resolveManaRNG(newState)

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

    // This checks if a unit has been frozen this turn to allow Icicle Burst
    // to be played

    // Note: The destroying ability of Wisp Cloud is implemented: Freezing with Frosthexers will
    // make Icicle Burst playable, but playing Wisp Cloud will make it unplayable again
    if (id.split('#')[0] === 'W1' && !this.state.specifics.frozenEnemiesLevel) {
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

      if (unplayableSpells.includes(id.split('#')[0])) return false
    }

    return isAffordable
  }

  reset = () => {
    this.setState(getDefaultState(this.props), this.drawHand)
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
