import React from 'react'
import modifyDeck from '~/helpers/modifyDeck'
import DryRunner from '~/components/DryRunner'
import { CardsContext } from '~/components/CardsProvider'
import { NotificationContext } from '~/components/NotificationProvider'
import useDeckMechanisms from '~/hooks/useDeckMechanisms'
import useDryRunner from './useDryRunner'

export default React.memo(function DeckDryRunView(props) {
  const { notify } = React.useContext(NotificationContext)
  const { cards, cardsIndex } = React.useContext(CardsContext)
  const sendNotification = React.useCallback(
    message => notify({ icon: 'sword', children: message }),
    [notify]
  )
  const [modifier, setModifier] = React.useState('NONE')
  const [equalsMode, setEqualsMode] = React.useState(false)
  const [harvestersCards, setHarvestersCards] = React.useState([])
  const harvestersDialogRef = React.useRef()
  const HoS = {
    cards: harvestersCards,
    setCards: setHarvestersCards,
    dialog: harvestersDialogRef,
  }

  // If the deck is saved as brawl/tournament, load the dry-runner in the
  // correct mode
  React.useEffect(() => {
    if (props.preset.modifier.includes('MANA')) {
      const brawl = props.brawls.find(
        brawl => brawl.id === props.preset.modifier
      )
      setModifier(props.preset.modifier)
      sendNotification(`Brawl deck found. Loaded with modifier ${brawl.name}.`)
    }

    if (props.preset.equals) {
      setEqualsMode(props.preset.equals)
      sendNotification('Tournament deck found. Loaded in equals mode.')
    }
  }, [sendNotification, props.preset, props.brawls])

  const addIdx = card => ({ idx: '0', ...card })
  const deck = modifyDeck(cardsIndex, props.deck, modifier, equalsMode).map(
    addIdx
  )
  const settings = { HoS, equalsMode, setEqualsMode, modifier, setModifier }
  const deckMechanisms = useDeckMechanisms({
    brawls: props.brawls,
    deck,
    cards,
    cardsIndex,
    ...settings,
  })
  const dryRunner = useDryRunner({ ...props, ...deckMechanisms, ...settings })

  return (
    <DryRunner {...props} {...settings} {...deckMechanisms} {...dryRunner} />
  )
})
