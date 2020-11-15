import React from 'react'
import { useHistory } from 'react-router-dom'
import Advice from '../DeckAdvice'
import Article from '../Article'
import Deck from '../Deck'
import DeckStatsChart from '../DeckStatsChart'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Stats from '../DeckStats'
import Title from '../Title'
import { NotificationContext } from '../NotificationProvider'
import { CATEGORIES } from '../../constants/deck'
import getDeckBuilderMetaTags from '../../helpers/getDeckBuilderMetaTags'
import modifyDeck from '../../helpers/modifyDeck'
import getDeckPresets from '../../helpers/getDeckPresets'
import isSuggestedDeck from '../../helpers/isSuggestedDeck'
import useViewportWidth from '../../hooks/useViewportWidth'
import { BRAWL_INDEX } from '../../constants/brawl'

const getDefaultBrawlModifier = deck => {
  const presets = getDeckPresets(deck)

  return presets.modifier.includes('MANA') ? presets.modifier : 'NONE'
}

export default React.memo(function DeckDetailView(props) {
  const viewportWidth = useViewportWidth()
  const { notify } = React.useContext(NotificationContext)
  const history = useHistory()
  const defaultModifier = getDefaultBrawlModifier(props.deck)
  const [modifier, setModifier] = React.useState(defaultModifier)
  const deck = React.useMemo(() => modifyDeck(props.deck, modifier), [
    modifier,
    props.deck,
  ])
  const suggestedDeck = isSuggestedDeck(props.deck) || {}
  const sendNotification = React.useCallback(
    message => notify({ icon: 'stack', children: message }),
    [notify]
  )

  React.useEffect(() => {
    if (defaultModifier !== 'NONE') {
      const brawlLabel = BRAWL_INDEX[defaultModifier].label
      sendNotification(`Brawl deck found. Loaded with modifier ${brawlLabel}.`)
    }
  }, [defaultModifier, sendNotification])

  return (
    <Article
      title={suggestedDeck.name || 'Deck details'}
      author={suggestedDeck.author}
      meta={
        suggestedDeck.category
          ? CATEGORIES[suggestedDeck.category] +
            ' deck' +
            (suggestedDeck.category === 'BRAWL'
              ? ' (' + BRAWL_INDEX[suggestedDeck.brawl].title + ')'
              : '')
          : undefined
      }
      action={{ to: '/deck/' + props.deckId, children: 'Edit deck' }}
      smallFontSize
    >
      <Row desktopOnly wideGutter>
        <Row.Column width='1/3'>
          <Title style={{ marginTop: 0 }}>Deck</Title>
          <Deck
            id='deck'
            deck={deck}
            orientation={viewportWidth >= 700 ? 'vertical' : 'horizontal'}
            highlightedCards={props.highlightedCards}
            onClick={card => history.push('/card/' + card.id + '/display')}
            onClickLabel='Open card in card builder'
          />
        </Row.Column>

        <Row.Column width='1/3'>
          <Stats deck={deck} highlight={props.highlight} />
          <DeckStatsChart
            deck={deck}
            modifier={modifier}
            setModifier={setModifier}
            withHowTo
            withModifiers
          />
        </Row.Column>

        <Row.Column width='1/3'>
          <Advice deck={deck} highlight={props.highlight} modifier={modifier} />
        </Row.Column>
      </Row>

      <PageMeta {...getDeckBuilderMetaTags(props.deck, 'Deck Insights')} />
    </Article>
  )
})
