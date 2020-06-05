import React from 'react'
import { useHistory } from 'react-router-dom'
import Advice from '../DeckAdvice'
import Column from '../Column'
import Deck from '../Deck'
import DeckStatsChart from '../DeckStatsChart'
import PageMeta from '../PageMeta'
import Row from '../Row'
import ShareButton from '../DeckShareButton'
import Stats from '../DeckStats'
import Title from '../Title'
import { NotificationContext } from '../NotificationProvider'
import getDeckBuilderMetaTags from '../../helpers/getDeckBuilderMetaTags'
import modifyDeck from '../../helpers/modifyDeck'
import getDeckPresets from '../../helpers/getDeckPresets'
import { BRAWLS } from '../../constants/brawl'

const getDefaultBrawlModifier = deck => {
  const presets = getDeckPresets(deck)

  return presets.modifier.includes('MANA') ? presets.modifier : 'NONE'
}

export default React.memo(function DeckDetailView(props) {
  const { notify } = React.useContext(NotificationContext)
  const history = useHistory()
  const defaultModifier = getDefaultBrawlModifier(props.deck)
  const [modifier, setModifier] = React.useState(defaultModifier)
  const deck = modifyDeck(props.deck, modifier)
  const sendNotification = React.useCallback(
    message => notify({ icon: 'stack', children: message }),
    [notify]
  )

  React.useEffect(() => {
    if (defaultModifier !== 'NONE') {
      const brawlLabel = BRAWLS.find(({ id }) => id === defaultModifier).label
      sendNotification(`Brawl deck found. Loaded with modifier ${brawlLabel}.`)
    }
  }, [defaultModifier, sendNotification])

  return (
    <>
      <h1 className='VisuallyHidden'>Deck Detail</h1>

      <Row desktopOnly wideGutter>
        <Column width='1/3'>
          <Title>Your deck</Title>
          <Deck
            id='deck'
            deck={deck}
            highlightedCards={props.highlightedCards}
            onClick={card => history.push('/card/' + card.id + '/display')}
            onClickLabel='Open card in card builder'
          />

          <Row>
            <Column>
              <ShareButton label='Share deck' />
            </Column>
          </Row>
        </Column>

        <Column width='1/3'>
          <Stats deck={deck} highlight={props.highlight} />
          <DeckStatsChart
            deck={deck}
            modifier={modifier}
            setModifier={setModifier}
          />
        </Column>

        <Column width='1/3'>
          <Advice deck={deck} highlight={props.highlight} modifier={modifier} />
        </Column>
      </Row>

      <PageMeta {...getDeckBuilderMetaTags(props.deck)} title='Deck Details' />
    </>
  )
})
