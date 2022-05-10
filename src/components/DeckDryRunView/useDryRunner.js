import React from 'react'
import isCard from '~/helpers/isCard'
import usePrevious from '~/hooks/usePrevious'

const useDryRunner = props => {
  // The mode is theoretically not quite supposed to be changed at run time, but
  // this is a workaround to be able to pick an initial hand for testing
  // purposes. The mode is restored to `AUTOMATIC` as soon as the 4th card has
  // been picked.
  const [mode, setMode] = React.useState('AUTOMATIC')
  const { reset, cycle, draw, play, canCardBePlayed } = props
  const [activeCard, setActiveCard] = React.useState(null)
  const [turnsWithLeftOverMana, setTurnsWithLeftOverMana] = React.useState(0)
  const [turnsWithoutCycling, setTurnsWithoutCycling] = React.useState(0)
  const [totalUnspentMana, setTotalUnspentMana] = React.useState(0)
  const [totalCardsPlayed, setTotalCardsPlayed] = React.useState(0)
  const [displayChance, setDisplayChance] = React.useState(false)
  const previousMana = usePrevious(props.mana)
  const previousHasCycledThisTurn = usePrevious(props.hasCycledThisTurn)

  const onDeckCardClick = React.useCallback(
    card => {
      draw(card)

      // This here is a workaround to be able to pick the initial hand for
      // testing purposes; it switches the deck mechanisms back to ‘AUTOMATIC’
      // as soon as the hand has been filled.
      // It checks for 3 cards in the length as the fourth was just drawn on
      // but has not made its way through the hand just yet.
      if (props.hand.length === 3) setMode('AUTOMATIC')
    },
    [draw, setMode, props.hand]
  )

  const selectCard = React.useCallback(
    id => setActiveCard(activeCard => (activeCard === id ? null : id)),
    []
  )

  const cycleCard = React.useCallback(() => {
    cycle(activeCard)
    setActiveCard(null)
  }, [cycle, activeCard])

  const playCard = React.useCallback(() => {
    // The reason the mode is not read from the URL here is that when in manual
    // mode, once the initial hand has been picked, the game is switched back to
    // automatic mode, which is the one that should be honored.
    play(activeCard, { mode })
    setTotalCardsPlayed(count => count + 1)
    setActiveCard(null)
  }, [play, activeCard, mode])

  const resetGame = React.useCallback(() => {
    // When initialising or reseting the game, read the expected game mode from
    // the URL, and set it in the state, as well as pass it to the `reset`
    // function to determine whether the hand should be (re)filled.
    const query = new URLSearchParams(window.location.search)
    const mode = query.get('mode')

    reset(mode !== 'MANUAL')
    setMode(mode || 'AUTOMATIC')
    setActiveCard(null)
    setTurnsWithLeftOverMana(0)
    setTurnsWithoutCycling(0)
    setTotalUnspentMana(0)
    setTotalCardsPlayed(0)
  }, [reset, setMode])

  const displayDeck = React.useMemo(() => {
    const sum = props.deck.map(card => card.weight).reduce((a, b) => a + b, 0)

    return props.deck.map(card => {
      const chance = ((card.weight / sum) * 100).toFixed(2)
      const name = displayChance
        ? `${card.name} (${
            props.hand.find(isCard(card)) ? 'in hand' : `${chance}%`
          })`
        : card.name

      return { ...card, name }
    })
  }, [props.deck, props.hand, displayChance])

  React.useEffect(
    // Note that this *also* happens on mount, which is how we start the game in
    // the first place.
    () => resetGame(),
    // eslint-disable-next-line
    [props.equalsMode, props.modifier]
  )

  const registerShortcuts = React.useCallback(
    event => {
      const C_KEY = 67
      const P_KEY = 80
      const numKeys = [49, 50, 51, 52]
      const padKeys = [97, 98, 99, 100]

      switch (event.which) {
        case 49:
        case 50:
        case 51:
        case 52: {
          selectCard(props.hand[numKeys.indexOf(event.which)])
          break
        }
        case 97:
        case 98:
        case 99:
        case 100: {
          selectCard(props.hand[padKeys.indexOf(event.which)])
          break
        }
        case P_KEY: {
          if (activeCard && canCardBePlayed(activeCard)) playCard()
          break
        }
        case C_KEY: {
          if (activeCard && !props.hasCycledThisTurn) cycleCard()
          break
        }
        default:
          break
      }
    },
    [
      activeCard,
      canCardBePlayed,
      cycleCard,
      playCard,
      selectCard,
      props.hand,
      props.hasCycledThisTurn,
    ]
  )

  React.useEffect(() => {
    if (props.HoS.cards.length) {
      props.HoS.dialog.current?.show()
      document.removeEventListener('keydown', registerShortcuts)
    } else {
      props.HoS.dialog.current?.hide()
      document.addEventListener('keydown', registerShortcuts)
    }
  }, [props.HoS, registerShortcuts])

  React.useEffect(() => {
    setActiveCard(null)
    setTotalUnspentMana(count => count + (previousMana || 0))
    if (previousMana) setTurnsWithLeftOverMana(count => count + 1)
    if (!previousHasCycledThisTurn) setTurnsWithoutCycling(count => count + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.turn])

  React.useEffect(() => {
    document.addEventListener('keydown', registerShortcuts)
    return () => document.removeEventListener('keydown', registerShortcuts)
  }, [registerShortcuts])

  return {
    activeCard,
    turnsWithLeftOverMana,
    turnsWithoutCycling,
    totalUnspentMana,
    totalCardsPlayed,
    displayChance,
    displayDeck,
    onDeckCardClick: mode === 'MANUAL' ? onDeckCardClick : undefined,
    setDisplayChance,
    resetGame,
    selectCard,
    playCard,
    cycleCard,
  }
}

export default useDryRunner
