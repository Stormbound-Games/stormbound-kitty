import React from 'react'
import { useFela } from 'react-fela'
import CardsGallery from '~/components/CardsGallery'
import Deck from '~/components/Deck'
import DeckAdvice from '~/components/DeckAdvice'
import DeckStats from '~/components/DeckStats'
import DeckStatsChart from '~/components/DeckStatsChart'
import Info from '~/components/Info'
import Link from '~/components/Link'
import Notice from '~/components/Notice'
import Page from '~/components/Page'
import ResetButton from '~/components/ResetButton'
import Row from '~/components/Row'
import ShareButton from '~/components/DeckShareButton'
import Title from '~/components/Title'
import { Common, Rare, Epic, Legendary } from '~/components/Resource'
import cards from '~/data/cards'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import getOrdinalSuffix from '~/helpers/getOrdinalSuffix'
import shuffle from '~/helpers/shuffle'
import serialization from '~/helpers/serialization'
import useNavigator from '~/hooks/useNavigator'
import styles from './styles'

const ROLLS = [
  state => {
    const legendaries = shuffle(
      cards.filter(
        ({ rarity, faction }) => rarity === 'legendary' && faction !== 'neutral'
      )
    )

    const options = []
    while (options.length < 3) {
      const option = legendaries.pop()
      if (options.some(({ faction }) => faction === option.faction)) continue
      else options.push(option)
    }

    return options
  },
  state =>
    cards.filter(
      ({ rarity, faction, id }) =>
        rarity === 'epic' &&
        faction === state.faction &&
        !state.deck.some(card => card.id === id)
    ),
  state =>
    cards.filter(
      ({ rarity, faction, mana, id }) =>
        rarity === 'rare' &&
        [state.faction, 'neutral'].includes(faction) &&
        mana <= 3 &&
        !state.deck.some(card => card.id === id)
    ),
  state =>
    cards.filter(
      ({ rarity, faction, mana, id }) =>
        rarity === 'rare' &&
        [state.faction, 'neutral'].includes(faction) &&
        mana <= 4 &&
        !state.deck.some(card => card.id === id)
    ),
  state =>
    cards.filter(
      ({ rarity, faction, id }) =>
        rarity === 'rare' &&
        [state.faction, 'neutral'].includes(faction) &&
        !state.deck.some(card => card.id === id)
    ),
  state =>
    cards.filter(
      ({ rarity, faction, id }) =>
        rarity === 'rare' &&
        [state.faction, 'neutral'].includes(faction) &&
        !state.deck.some(card => card.id === id)
    ),
  state =>
    cards.filter(
      ({ rarity, faction, mana, id }) =>
        rarity === 'common' &&
        [state.faction, 'neutral'].includes(faction) &&
        mana <= 3 &&
        !state.deck.some(card => card.id === id)
    ),
  state =>
    cards.filter(
      ({ rarity, faction, mana, id }) =>
        rarity === 'common' &&
        [state.faction, 'neutral'].includes(faction) &&
        mana <= 4 &&
        !state.deck.some(card => card.id === id)
    ),
  state =>
    cards.filter(
      ({ rarity, faction, id }) =>
        rarity === 'common' &&
        [state.faction, 'neutral'].includes(faction) &&
        !state.deck.some(card => card.id === id)
    ),
  state =>
    cards.filter(
      ({ rarity, faction, id }) =>
        rarity === 'common' &&
        [state.faction, 'neutral'].includes(faction) &&
        !state.deck.some(card => card.id === id)
    ),
  state =>
    cards.filter(
      ({ rarity, faction, id }) =>
        rarity === 'epic' &&
        [state.faction, 'neutral'].includes(faction) &&
        !state.deck.some(card => card.id === id)
    ),
  state =>
    cards.filter(
      ({ rarity, faction, id }) =>
        rarity === 'legendary' &&
        faction === 'neutral' &&
        !state.deck.some(card => card.id === id)
    ),
]

const useOptions = deck => {
  if (deck.length === 12) return []

  const { faction } = deck.find(card => card.faction !== 'neutral') ?? {}
  const getPool = ROLLS[deck.length]
  const pool = shuffle(getPool({ deck, faction }).slice(0))
  const options = pool.slice(0, 3)
  const cards = options.map(card =>
    getResolvedCardData({ id: card.id, level: 1 })
  )

  return cards
}

export default React.memo(function DraftSimulator(props) {
  const navigator = useNavigator()
  const { css } = useFela({ cards: props.cards })
  const options = useOptions(props.cards)
  const [highlightedCards, setHighlightedCards] = React.useState([])

  const addToDeck = React.useCallback(
    id => {
      const deck = [...props.cards, getResolvedCardData({ id, level: 1 })]
      const deckId = serialization.deck.serialize(deck)

      navigator.replace(`/simulators/draft/${deckId}`)
    },
    // eslint-disable-next-line
    [props.cards]
  )

  return (
    <Page
      title='Draft Simulator'
      description='Create draft decks just like you would do in the game'
    >
      <Row isDesktopOnly>
        <Row.Column width='1/3'>
          <Title>Deck</Title>
          <Deck deck={props.cards} highlightedCards={highlightedCards} />
          <DeckActions
            deck={props.cards}
            reset={() => navigator.push('/simulators/draft')}
          />

          <Info icon='compass' title='Intro to Draft'>
            <p>
              If you’re not familiar with the Draft mode, you should first{' '}
              <Link to='/guides/draft'>read the guide</Link> to get started.
            </p>
          </Info>
        </Row.Column>

        {options.length ? (
          <Row.Column width='2/3'>
            <Title>Draft</Title>

            <CardsGallery
              cardsPerPage={6}
              cards={options}
              hideNavButtons
              onCardClick={addToDeck}
            />
            <Notice icon='stack' spacing={{ top: 'LARGER' }}>
              Pick your {getOrdinalSuffix(props.cards.length + 1)} card.
            </Notice>

            <ol className={css(styles.list)}>
              <li>
                <Legendary amount={3} /> from different factions
              </li>
              <li>
                <Epic amount={3} /> from your faction
              </li>
              <li>
                <Rare amount={3} /> with a mana cost of 3- from faction +
                neutral
              </li>
              <li>
                <Rare amount={3} /> with a mana cost of 4- from faction +
                neutral
              </li>
              <li>
                <Rare amount={3} /> from faction + neutral
              </li>
              <li>
                <Rare amount={3} /> from faction + neutral
              </li>
              <li>
                <Common amount={3} /> with a mana cost of 3- from faction +
                neutral
              </li>
              <li>
                <Common amount={3} /> with a mana cost of 4- from faction +
                neutral
              </li>
              <li>
                <Common amount={3} /> from faction + neutral
              </li>
              <li>
                <Common amount={3} /> from faction + neutral
              </li>
              <li>
                <Epic amount={3} /> from faction + neutral
              </li>
              <li>
                <Legendary amount={3} /> from the neutral faction
              </li>
            </ol>
          </Row.Column>
        ) : (
          <>
            <Row.Column width='1/3'>
              <DeckStats deck={props.cards} highlight={setHighlightedCards} />
              <DeckStatsChart
                deck={props.cards}
                withHowTo
                withModifiers={false}
              />
            </Row.Column>
            <Row.Column width='1/3'>
              <DeckAdvice
                deck={props.cards}
                highlight={setHighlightedCards}
                advice={props.advice}
              />
            </Row.Column>
          </>
        )}
      </Row>
    </Page>
  )
})

const DeckActions = React.memo(function DeckActions(props) {
  return (
    <Row>
      <Row.Column>
        <ResetButton
          label='Reset deck'
          confirm='Are you sure you want to reset your deck?'
          reset={props.reset}
          disabled={props.deck.length === 0}
        />
      </Row.Column>
      <Row.Column>
        <ShareButton deck={props.deck} disabled={props.deck.length < 12} />
      </Row.Column>
    </Row>
  )
})
