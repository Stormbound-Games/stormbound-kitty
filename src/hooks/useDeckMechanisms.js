import React from 'react'
import { DEFAULT_MANA } from '#constants/battle'
import clone from '#helpers/clone'
import isCard from '#helpers/isCard'
import canCardBePlayed from '#helpers/canCardBePlayed'
import getOpponentDeck from '#helpers/getOpponentDeck'
import resolveDeckWeight from '#helpers/resolveDeckWeight'
import deckMechanisms from '#helpers/deckMechanisms'

const getDefaultState = props => ({
  hand: [],
  RNG: props.RNG || 'REGULAR',
  hasCycledThisTurn: false,
  specifics: {
    activeOrgoneLeechersAllies: 0,
    activeFrozenCores: 0,
    activeDawnsparks: 0,
    activeOrgoneLeechers: 0,
    noFriendlyUnitsOnFirstTurn: true,
    frozenEnemiesLevel: 0,
    emptyCellsIndicator: 4,
  },
  turn: props.turn || 1,
  mana: DEFAULT_MANA + ((props.turn || 1) - 1),
  deck: resolveDeckWeight(props.cardsIndex, props.deck),
  playerOrder: 'FIRST',
  playedCards: [],
  cardsThisTurn: 0,
  equalsMode: props.equalsMode,
  modifier: props.modifier,
  opponentDeck: getOpponentDeck(props),
  cardsIndex: props.cardsIndex,
})

const useDeckMechanisms = props => {
  const [state, setState] = React.useState(getDefaultState(props))

  const draw = React.useCallback((card = null) => {
    setState(state =>
      state.hand.length < 4 ? deckMechanisms.draw(clone(state), card) : state
    )
  }, [])

  const cycle = React.useCallback(
    (card, options = deckMechanisms.DEFAULT_CYCLE_OPTIONS) => {
      const opts = { ...options, modifier: props.modifier }
      setState(state => deckMechanisms.cycle(clone(state), card, opts))
    },
    [props.modifier]
  )

  const play = React.useCallback(
    (card, options = deckMechanisms.DEFAULT_PLAY_OPTIONS) => {
      setState(state => {
        const cardData = state.deck.find(isCard(card))
        const canAfford = options.free || cardData.mana <= state.mana
        const opts = { ...options, modifier: props.modifier }

        // If it’s not a discard move and the card costs more mana than the
        // current round, skip play.
        return options.discard || canAfford
          ? deckMechanisms.play(clone(state), card, opts, props.HoS)
          : state
      })
    },
    [props.modifier, props.HoS]
  )

  const addCardToDeck = React.useCallback(
    card => setState(state => ({ ...state, deck: [...state.deck, card] })),
    []
  )

  const endTurn = React.useCallback(
    () =>
      setState(state =>
        deckMechanisms.endTurn(clone(state), { modifier: props.modifier })
      ),
    [props.modifier]
  )

  const _canCardBePlayed = React.useCallback(
    card => {
      // Fall back onto the card itself if not found in the deck, which happens
      // for single-use card copies (for instance the one created by Rogue
      // Sheep).
      const cardData = state.deck.find(isCard(card)) || card

      return canCardBePlayed(state.mana, cardData, {
        turn: state.turn,
        noFriendlyUnits: Boolean(state.specifics.noFriendlyUnitsOnFirstTurn),
        frozenEnemies: Boolean(state.specifics.frozenEnemiesLevel),
        emptyCells: Boolean(state.specifics.emptyCellsIndicator),
      })
    },
    [state.mana, state.deck, state.turn, state.specifics]
  )

  React.useEffect(() => {
    setState(state => ({ ...state, opponentDeck: getOpponentDeck(props) }))
    // eslint-disable-next-line
  }, [props.modifier, props.opponentFinch])

  const reset = React.useCallback(
    withRefill => {
      setState(state => {
        const newState = getDefaultState({ ...props, RNG: state.RNG })

        if (withRefill) deckMechanisms.refill(newState)

        return newState
      })
    },
    [props]
  )

  const setPlayerOrder = React.useCallback(playerOrder => {
    const turn = playerOrder === 'SECOND' ? 2 : 1

    setState(state => ({
      ...state,
      playerOrder,
      turn,
      mana: DEFAULT_MANA + (turn - 1),
    }))
  }, [])

  return {
    ...state,
    canCardBePlayed: _canCardBePlayed,
    setPlayerOrder: setPlayerOrder,
    play: play,
    draw: draw,
    cycle: cycle,
    reset: reset,
    endTurn: endTurn,
    addCardToDeck: addCardToDeck,
    setRNG: RNG => setState(state => ({ ...state, RNG })),
  }
}

export default useDeckMechanisms
