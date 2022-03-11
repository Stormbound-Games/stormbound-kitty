import React from 'react'
import { FACTIONS } from '~/constants/game'
import { CardsContext } from '~/components/CardsProvider'
import { CollectionContext } from '~/components/CollectionProvider'
import CTA from '~/components/CTA'
import Dialog from '~/components/Dialog'
import FactionSelect from '~/components/FactionSelect'
import LearnMoreIcon from '~/components/LearnMoreIcon'
import Only from '~/components/Only'
import Row from '~/components/Row'
import Select from '~/components/Select'
import getRandomDeck from '~/helpers/getRandomDeck'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import arrayRandom from '~/helpers/arrayRandom'

const getRandomFaction = () =>
  arrayRandom(FACTIONS.filter(faction => faction !== 'neutral'))

export default React.memo(function RandomDeckButton(props) {
  const dialog = React.useRef(null)
  const { cardsIndex } = React.useContext(CardsContext)
  const { collection } = React.useContext(CollectionContext)
  const [faction, setFaction] = React.useState('*')
  const [minFactionCards, setMinFactionCards] = React.useState(0)
  const [maxLegendaryCards, setMaxLegendaryCards] = React.useState('')
  const [maxEpicCards, setMaxEpicCards] = React.useState('')
  const { defineDeck } = props
  const availableCards = collection.map(card =>
    getResolvedCardData(cardsIndex, card)
  )

  const generateDeck = React.useCallback(() => {
    const deck = getRandomDeck({
      availableCards,
      faction: faction === '*' ? getRandomFaction() : faction,
      maxEpicCards: !isNaN(+maxEpicCards) ? +maxEpicCards : undefined,
      maxLegendaryCards: !isNaN(+maxLegendaryCards)
        ? +maxLegendaryCards
        : undefined,
      minFactionCards: minFactionCards,
    })

    defineDeck(deck)
    dialog.current.hide()
  }, [
    availableCards,
    defineDeck,
    faction,
    minFactionCards,
    maxEpicCards,
    maxLegendaryCards,
  ])

  return (
    <>
      <CTA
        onClick={() => dialog.current.show()}
        type='button'
        data-testid='random-deck-btn'
      >
        {props.label || 'Random deck'}
      </CTA>
      <Dialog
        id='random-deck-dialog'
        title={
          <>
            Generate random deck{' '}
            <LearnMoreIcon anchor='#random-deck'>
              Learn more about random decks
            </LearnMoreIcon>
          </>
        }
        dialogRef={instance => (dialog.current = instance)}
        image='https://cdn.sanity.io/images/5hlpazgd/production/596e054dac114d033c4ceca539e4af9f00ff6f87-512x512.png'
        close={() => dialog.current.hide()}
        ctaProps={{
          onClick: generateDeck,
          type: 'button',
          children: 'Generate deck',
          'data-testid': 'random-deck-dialog-confirm-btn',
        }}
      >
        <Row withNarrowGutter>
          <Row.Column>
            <FactionSelect
              data-testid='random-faction-select'
              value={faction}
              onChange={event => setFaction(event.target.value)}
              withAny
            />
          </Row.Column>
          <Row.Column>
            <Select
              label='Min faction cards'
              data-testid='random-min-faction-select'
              id='factionCards'
              value={minFactionCards}
              onChange={event => setMinFactionCards(+event.target.value)}
            >
              <option value={0}>0</option>
              <option value={2}>2</option>
              <option value={4}>4</option>
              <option value={6}>6</option>
            </Select>
          </Row.Column>
        </Row>
        <Row withNarrowGutter>
          <Row.Column>
            <Select
              label='Max epic cards'
              data-testid='random-max-epic-select'
              id='maxEpicCards'
              value={maxEpicCards}
              onChange={event => setMaxEpicCards(event.target.value)}
            >
              <option value=''>Any</option>
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </Select>
          </Row.Column>
          <Row.Column>
            <Select
              label={
                <>
                  <Only.Mobile>Max leg. cards</Only.Mobile>
                  <Only.Desktop>Max legendary cards</Only.Desktop>
                </>
              }
              data-testid='random-max-legendary-select'
              id='maxLegendaryCards'
              value={maxLegendaryCards}
              onChange={event => setMaxLegendaryCards(event.target.value)}
            >
              <option value=''>Any</option>
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
            </Select>
          </Row.Column>
        </Row>
      </Dialog>
    </>
  )
})
