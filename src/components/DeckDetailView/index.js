import React from 'react'
import DeckAdvice from '~/components/DeckAdvice'
import Page from '~/components/Page'
import Deck from '~/components/Deck'
import DeckStatsChart from '~/components/DeckStatsChart'
import Info from '~/components/Info'
import Link from '~/components/Link'
import Row from '~/components/Row'
import Stats from '~/components/DeckStats'
import Title from '~/components/Title'
import { CardsContext } from '~/components/CardsProvider'
import { NotificationContext } from '~/components/NotificationProvider'
import getDeckBuilderMetaTags from '~/helpers/getDeckBuilderMetaTags'
import modifyDeck from '~/helpers/modifyDeck'
import toSentence from '~/helpers/toSentence'
import indexArray from '~/helpers/indexArray'
import useNavigator from '~/hooks/useNavigator'

export default React.memo(function DeckDetailView(props) {
  const { notify } = React.useContext(NotificationContext)
  const { cardsIndex } = React.useContext(CardsContext)
  const navigator = useNavigator()
  const defaultModifier = props.preset.modifier.includes('MANA')
    ? props.preset.modifier
    : 'NONE'
  const [modifier, setModifier] = React.useState(defaultModifier)
  const deck = React.useMemo(
    () => modifyDeck(cardsIndex, props.deck, modifier),
    [cardsIndex, modifier, props.deck]
  )
  const suggestedDeck = props.suggestedDeck || {}
  const sendNotification = React.useCallback(
    message => notify({ icon: 'stack', children: message }),
    [notify]
  )
  const brawlsIndex = indexArray(props.brawls)

  React.useEffect(() => {
    if (defaultModifier !== 'NONE') {
      const brawl = brawlsIndex[defaultModifier]
      sendNotification(`Brawl deck found. Loaded with modifier ${brawl.name}.`)
    }
  }, [defaultModifier, brawlsIndex, sendNotification])

  return (
    <Page
      title={suggestedDeck.name || 'Deck details'}
      {...getDeckBuilderMetaTags(
        cardsIndex,
        props.deck,
        props.suggestedDeck,
        'Deck Insights'
      )}
      author={suggestedDeck.author}
      meta={
        suggestedDeck.tags
          ? toSentence(
              suggestedDeck.tags.map(tag => tag.name),
              'and'
            )
          : undefined
      }
      action={{ to: '/deck/' + props.deckId, children: 'Edit deck' }}
    >
      <Row isDesktopOnly>
        <Row.Column width='1/3'>
          <Title>Deck</Title>
          <Deck
            id='deck'
            deck={deck}
            orientation='vertical'
            highlightedCards={props.highlightedCards}
            onClick={card => navigator.push('/card/' + card.id + '/display')}
            onClickLabel='Open card in card builder'
          />
          {suggestedDeck.name === 'Reckless Rush' && (
            <Info icon='compass' title='Reckless Rush Guide'>
              <p>
                If you are interested in playing the Reckless Rush deck, be sure
                to read{' '}
                <Link to='/guides/reckless-rush'>the comprehensive guide</Link>.
              </p>
            </Info>
          )}
        </Row.Column>

        <Row.Column width='1/3'>
          <Stats deck={deck} highlight={props.highlight} />
          <DeckStatsChart
            brawls={props.brawls}
            deck={deck}
            modifier={modifier}
            setModifier={setModifier}
            withHowTo
            withModifiers
          />
        </Row.Column>

        <Row.Column width='1/3'>
          <DeckAdvice
            deck={deck}
            modifier={modifier}
            highlight={props.highlight}
            advice={props.advice}
          />
        </Row.Column>
      </Row>
    </Page>
  )
})
