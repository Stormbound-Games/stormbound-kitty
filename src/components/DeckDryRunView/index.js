import React from 'react'
import modifyDeck from '../../helpers/modifyDeck'
import DryRunner from '../DryRunner'
import DeckMechanisms from '../DeckMechanisms'
import { NotificationContext } from '../NotificationProvider'
import CardLink from '../CardLink'
import { BRAWL_INDEX } from '../../constants/brawl'
import isCard from '../../helpers/isCard'
import getDeckPresets from '../../helpers/getDeckPresets'
import useRouter from '../../hooks/useRouter'

class View extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeCard: null,
      turnsWithLeftOverMana: 0,
      turnsWithoutCycling: 0,
      totalUnspentMana: 0,
      totalCardsPlayed: 0,
      displayChance: false,
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.registerShortcuts)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.registerShortcuts)
  }

  registerShortcuts = event => {
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

        return this.selectCard(card)
      }
      case 97:
      case 98:
      case 99:
      case 100: {
        const index = padKeys.indexOf(event.which)
        const card = this.props.hand[index]

        return this.selectCard(card)
      }
      case P_KEY: {
        return this.state.activeCard &&
          this.props.canCardBePlayed(this.state.activeCard)
          ? this.playCard()
          : undefined
      }
      case C_KEY: {
        return this.state.activeCard && !this.props.hasCycledThisTurn
          ? this.cycleCard()
          : undefined
      }
      default:
        return
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.HoS.cards.length && this.props.HoS.cards.length) {
      this.props.HoS.dialog.current.show()
      document.removeEventListener('keydown', this.registerShortcuts)
    } else if (prevProps.HoS.cards.length && !this.props.HoS.cards.length) {
      this.props.HoS.dialog.current.hide()
      document.addEventListener('keydown', this.registerShortcuts)
    }
    if (
      prevProps.equalsMode !== this.props.equalsMode ||
      prevProps.modifier !== this.props.modifier
    ) {
      this.resetGame()
    }

    if (prevProps.turn < this.props.turn) {
      this.setState(state => ({
        // Un-select the active card to make the turn transition clearer
        activeCard: null,
        totalUnspentMana: state.totalUnspentMana + prevProps.mana,
      }))

      if (prevProps.mana) {
        this.setState(state => ({
          turnsWithLeftOverMana: state.turnsWithLeftOverMana + 1,
        }))
      }

      if (!prevProps.hasCycledThisTurn) {
        this.setState(state => ({
          turnsWithoutCycling: state.turnsWithoutCycling + 1,
        }))
      }
    }
  }

  selectCard = id => {
    this.setState(state => ({
      activeCard: state.activeCard === id ? null : id,
    }))
  }

  cycleCard = () => {
    this.props.cycle(this.state.activeCard)
    this.setState({ activeCard: null })
  }

  playCard = () => {
    this.props.play(this.state.activeCard)
    this.setState(state => ({
      totalCardsPlayed: state.totalCardsPlayed + 1,
      activeCard: null,
    }))
  }

  resetGame = () => {
    this.props.reset()
    this.setState({
      activeCard: null,
      turnsWithLeftOverMana: 0,
      turnsWithoutCycling: 0,
      totalUnspentMana: 0,
      totalCardsPlayed: 0,
    })
  }

  getDisplayDeck = () => {
    const sum = this.props.deck
      .map(card => card.weight)
      .reduce((a, b) => a + b, 0)

    return this.props.deck.map(card => {
      const chance = ((card.weight / sum) * 100).toFixed(2)
      const name = this.state.displayChance
        ? `${card.name} (${
            this.props.hand.find(isCard(card)) ? 'in hand' : `${chance}%`
          })`
        : card.name

      return { ...card, name }
    })
  }

  getFrozenCoreText = () => {
    // Get the text that should be displayed to indicate how many Frozen Cores there are on the board
    const { activeFrozenCores } = this.props.specifics
    return (
      <>
        There {activeFrozenCores === 1 ? 'is' : 'are'}{' '}
        {activeFrozenCores ? activeFrozenCores : 'no'}{' '}
        <CardLink id='W9'>
          Frozen {activeFrozenCores === 1 ? 'Core' : 'Cores'}
        </CardLink>{' '}
        on the board.
        <br />
      </>
    )
  }

  getDawnsparksText = () => {
    // Get the text that should be displayed to indicate how many Dawnsparks there are on the board
    const { activeDawnsparks } = this.props.specifics
    return (
      <>
        There {activeDawnsparks === 1 ? 'is' : 'are'}{' '}
        {activeDawnsparks ? activeDawnsparks : 'no'} <CardLink id='W16' />{' '}
        {activeDawnsparks === 0
          ? ''
          : activeDawnsparks === 1
          ? 'unit '
          : 'units '}
        on the board.
        <br />
      </>
    )
  }

  getFrozenEnemiesText = () => {
    // Display the approximation of the count of frozen enemy units on the board
    const { frozenEnemiesLevel } = this.props.specifics
    const frozenStateDescriptionCount = {
      0: 'no',
      2: 'a few',
      3: 'many',
    }
    const frozenStateDescription =
      frozenEnemiesLevel === 4
        ? 'The whole board is frozen.'
        : frozenEnemiesLevel === 1
        ? 'There is a frozen enemy on the board.'
        : `There are ${frozenStateDescriptionCount[frozenEnemiesLevel]} frozen enemies on the board.`

    return frozenStateDescription
  }

  containsFreeze = deck => {
    const deckIds = deck.map(card => card.id)
    const freezeCards = ['W1', 'W2', 'W4', 'W6', 'W8', 'W11']
    return deckIds.some(id => freezeCards.includes(id))
  }

  onDeckCardClick = card => {
    this.props.draw(card)

    // This here is a workaround to be able to pick the initial hand for testing
    // purposes; it switches the deck mechanisms back to ‘AUTOMATIC’ as soon as
    // the hand has been filled.
    // It checks for 3 cards in the length as the fourth was just drawn on L178
    // but has not made its way through the hand just yet.
    if (this.props.hand.length === 3) {
      this.props.setMode('AUTOMATIC')
    }
  }

  render() {
    return (
      <DryRunner
        {...this.props}
        {...this.state}
        displayDeck={this.getDisplayDeck()}
        onDeckCardClick={this.onDeckCardClick}
        setDisplayChance={displayChance => this.setState({ displayChance })}
        resetGame={this.resetGame}
        selectCard={this.selectCard}
        playCard={this.playCard}
        cycleCard={this.cycleCard}
        containsFreeze={this.containsFreeze}
        getFrozenCoreText={this.getFrozenCoreText}
        getDawnsparksText={this.getDawnsparksText}
        getFrozenEnemiesText={this.getFrozenEnemiesText}
      />
    )
  }
}

export default React.memo(function DeckDryRunView(props) {
  const { query } = useRouter()
  // The mode is theoretically not quite supposed to be changed at run time, but
  // this is a workaround to be able to pick an initial hand for testing
  // purposes. The mode is restored to `AUTOMATIC` as soon as the 4th card has
  // been picked.
  const { notify } = React.useContext(NotificationContext)
  const sendNotification = React.useCallback(
    message => notify({ icon: 'sword', children: message }),
    [notify]
  )
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

  return (
    <DeckMechanisms
      deck={deck}
      mode={mode}
      equalsMode={equalsMode}
      modifier={modifier}
      HoS={HoS}
    >
      {state => (
        <View
          {...props}
          {...state}
          mode={mode}
          setMode={setMode}
          equalsMode={equalsMode}
          setEqualsMode={setEqualsMode}
          modifier={modifier}
          setModifier={setModifier}
          playedCards={state.playedCards}
          cardsThisTurn={state.cardsThisTurn}
          HoS={HoS}
        />
      )}
    </DeckMechanisms>
  )
})
