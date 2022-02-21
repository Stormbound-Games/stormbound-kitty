import React from 'react'
import modifyDeck from '~/helpers/modifyDeck'
import DryRunner from '~/components/DryRunner'
import { NotificationContext } from '~/components/NotificationProvider'
import { BRAWL_INDEX } from '~/constants/brawl'
import getDeckPresets from '~/helpers/getDeckPresets'
import useDeckMechanisms from '~/hooks/useDeckMechanisms'
import useQueryParams from '~/hooks/useQueryParams'
import useDryRunner from './useDryRunner'

export default React.memo(function DeckDryRunView(props) {
  const { notify } = React.useContext(NotificationContext)
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

  // If the deck is saved as brawl/tournament, load the dry-runner in the correct mode
  React.useEffect(() => {
    const preset = getDeckPresets(props.suggestedDeck)

    if (preset.modifier.includes('MANA')) {
      const brawlLabel = BRAWL_INDEX[preset.modifier].label
      setModifier(preset.modifier)
      sendNotification(`Brawl deck found. Loaded with modifier ${brawlLabel}.`)
    }

    if (preset.equals) {
      setEqualsMode(preset.equals)
      sendNotification('Tournament deck found. Loaded in equals mode.')
    }
  }, [sendNotification, props.suggestedDeck])

  const addIdx = card => ({ idx: '0', ...card })
  const deck = modifyDeck(props.deck, modifier, equalsMode).map(addIdx)
  const settings = { HoS, equalsMode, setEqualsMode, modifier, setModifier }
  const deckMechanisms = useDeckMechanisms({ deck, ...settings })
  const dryRunner = useDryRunner({ ...props, ...deckMechanisms, ...settings })

  return (
    <DryRunner {...props} {...settings} {...deckMechanisms} {...dryRunner} />
  )
})
