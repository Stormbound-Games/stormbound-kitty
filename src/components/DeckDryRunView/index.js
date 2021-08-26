import React from 'react'
import modifyDeck from '~/helpers/modifyDeck'
import DryRunner from '~/components/DryRunner'
import { NotificationContext } from '~/components/NotificationProvider'
import { BRAWL_INDEX } from '~/constants/brawl'
import isCard from '~/helpers/isCard'
import getDeckPresets from '~/helpers/getDeckPresets'
import useDeckMechanisms from '~/hooks/useDeckMechanisms'
import useQueryParams from '~/hooks/useQueryParams'
import usePrevious from '~/hooks/usePrevious'

const useDryRunner = props => {
  const { reset, cycle, draw, play, setMode, canCardBePlayed } = props
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
    play(activeCard)
    setTotalCardsPlayed(count => count + 1)
    setActiveCard(null)
  }, [play, activeCard])

  const resetGame = React.useCallback(() => {
    reset()
    setActiveCard(null)
    setTurnsWithLeftOverMana(0)
    setTurnsWithoutCycling(0)
    setTotalUnspentMana(0)
    setTotalCardsPlayed(0)
  }, [reset])

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
    () => resetGame(),
    //eslint-disable-next-line
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
    onDeckCardClick,
    setDisplayChance,
    resetGame,
    selectCard,
    playCard,
    cycleCard,
  }
}

export default React.memo(function DeckDryRunView(props) {
  const query = useQueryParams()
  const { notify } = React.useContext(NotificationContext)
  const sendNotification = React.useCallback(
    message => notify({ icon: 'sword', children: message }),
    [notify]
  )
  // The mode is theoretically not quite supposed to be changed at run time, but
  // this is a workaround to be able to pick an initial hand for testing
  // purposes. The mode is restored to `AUTOMATIC` as soon as the 4th card has
  // been picked.
  const [mode, setMode] = React.useState(query.mode || 'AUTOMATIC')
  const [modifier, setModifier] = React.useState('NONE')
  const [equalsMode, setEqualsMode] = React.useState(false)
  const [harvestersCards, setHarvestersCards] = React.useState([])
  const harvestersDialogRef = React.useRef()
  const HoS = {
    cards: harvestersCards,
    setCards: setHarvestersCards,
    dialog: harvestersDialogRef,
  }

  // If the deck is saved as brawl/tournament, load the dry-runner in the correct mode
  React.useEffect(() => {
    const preset = getDeckPresets(props.deck)

    if (preset.modifier.includes('MANA')) {
      const brawlLabel = BRAWL_INDEX[preset.modifier].label
      setModifier(preset.modifier)
      sendNotification(`Brawl deck found. Loaded with modifier ${brawlLabel}.`)
    }

    if (preset.equals) {
      setEqualsMode(preset.equals)
      sendNotification('Tournament deck found. Loaded in equals mode.')
    }
  }, [sendNotification, props.deck])

  const addIdx = card => ({ idx: '0', ...card })
  const deck = modifyDeck(props.deck, modifier, equalsMode).map(addIdx)
  // prettier-ignore
  const settings = {
    HoS,
    mode, setMode,
    equalsMode, setEqualsMode,
    modifier, setModifier,
  }
  const deckMechanisms = useDeckMechanisms({ deck, ...settings })
  const dryRunner = useDryRunner({ ...props, ...deckMechanisms, ...settings })

  return (
    <DryRunner {...props} {...settings} {...deckMechanisms} {...dryRunner} />
  )
})
