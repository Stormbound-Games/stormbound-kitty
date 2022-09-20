import React from 'react'
import dynamic from 'next/dynamic'
import DeckAdvice from '#components/DeckAdvice'
import Page from '#components/Page'
import Deck from '#components/Deck'
import Info from '#components/Info'
import Link from '#components/Link'
import Row from '#components/Row'
import Stats from '#components/DeckStats'
import Title from '#components/Title'
import { CardsContext } from '#components/CardsProvider'
import { PersonalDecksContext } from '#components/PersonalDecksProvider'
import { NotificationContext } from '#components/NotificationProvider'
import getDeckBuilderMetaTags from '#helpers/getDeckBuilderMetaTags'
import modifyDeck from '#helpers/modifyDeck'
import toSentence from '#helpers/toSentence'
import indexArray from '#helpers/indexArray'
import useRouteId from '#hooks/useRouteId'

const DeckStatsChart = dynamic(() => import('#components/DeckStatsChart'))

export default React.memo(function DeckDetailView(props) {
  const id = useRouteId()
  const { notify } = React.useContext(NotificationContext)
  const { cardsIndex } = React.useContext(CardsContext)
  const { decks } = React.useContext(PersonalDecksContext)
  const brawlsIndex = React.useMemo(
    () => indexArray(props.brawls),
    [props.brawls]
  )
  const [modifier, setModifier] = React.useState(
    props.preset.modifier in brawlsIndex ? props.preset.modifier : 'NONE'
  )
  const deck = React.useMemo(
    () => modifyDeck(cardsIndex, props.deck, modifier),
    [cardsIndex, modifier, props.deck]
  )
  const suggestedDeck = props.suggestedDeck || {}
  const sendNotification = React.useCallback(
    message => notify({ icon: 'stack', children: message }),
    [notify]
  )

  React.useEffect(() => {
    if (modifier in brawlsIndex) {
      sendNotification(
        `Deck loaded with modifier ${brawlsIndex[modifier].name}.`
      )
    }
  }, [modifier, brawlsIndex, sendNotification])

  React.useEffect(() => {
    const bookmarkedDeck = decks.find(deck => deck.id === id)

    if (bookmarkedDeck) {
      const brawlTag = bookmarkedDeck.tags.find(tag => tag.slug in brawlsIndex)
      if (brawlTag) setModifier(brawlTag.slug)
    }
  }, [decks, id, brawlsIndex])

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
      action={{ to: '/deck/' + id, children: 'Edit deck' }}
    >
      <Row isDesktopOnly>
        <Row.Column width='1/3'>
          <Title>Deck</Title>
          <Deck
            id='deck'
            deck={deck}
            orientation='vertical'
            highlightedCards={props.highlightedCards}
            withCardLink
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
