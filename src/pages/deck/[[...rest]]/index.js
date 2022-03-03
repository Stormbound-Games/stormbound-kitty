import React from 'react'
import DeckEditorView from '~/components/DeckEditorView'
import DeckDetailView from '~/components/DeckDetailView'
import DeckDryRunView from '~/components/DeckDryRunView'
import Layout from '~/components/Layout'
import getDeck from '~/api/decks/getDeck'
import getDecks from '~/api/decks/getDecks'
import getDeckAdvice from '~/helpers/getDeckAdvice'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import getSiteSettings from '~/api/misc/getSiteSettings'
import indexArray from '~/helpers/indexArray'
import serialization from '~/helpers/serialization'
import useDeckBuilder from '~/hooks/useDeckBuilder'
import getCards from '~/api/cards/getCards'

export async function getStaticPaths() {
  const decks = await getDecks()
  const paths = decks
    .map(deck => [
      { params: { rest: [deck.id] } },
      { params: { rest: [deck.id, 'detail'] } },
    ])
    .flat()
    .concat([{ params: { rest: [] } }])

  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const settings = await getSiteSettings({ isPreview })
  const cardsIndex = indexArray(cards)
  const cardsIndexBySid = indexArray(cards, 'sid')
  const [id, view] = params.rest || []

  if (
    ['dry-run', 'detail'].includes(id) ||
    (view && !['dry-run', 'detail'].includes(view))
  ) {
    return { notFound: true }
  }

  if (!id) {
    return {
      props: {
        cards,
        settings,
        id: null,
        deck: [],
        advice: [],
        view: 'EDITOR',
        suggestedDeck: null,
      },
    }
  }

  const deck = id ? serialization.deck.deserialize(cardsIndexBySid, id) : []

  if (deck.some(card => !(card.id in cardsIndex))) {
    return { notFound: true }
  }

  const resolvedDeck = deck.map(card => getResolvedCardData(cardsIndex, card))
  const advice =
    view === 'detail' ? await getDeckAdvice(cardsIndex, resolvedDeck) : []
  const resolvedView =
    view === 'dry-run' ? 'DRY_RUN' : view === 'detail' ? 'DETAIL' : 'EDITOR'
  const suggestedDeck = await getDeck({ id, isPreview })
  const indexedDeck = indexArray(resolvedDeck)

  return {
    props: {
      // On the detail view, the only needed cards are the ones in the deck,
      // and every other card can be discarded.
      cards:
        view === 'detail'
          ? cards.filter(card => card.id in indexedDeck)
          : cards,
      settings,
      id,
      deck,
      advice,
      view: resolvedView,
      suggestedDeck,
    },
  }
}

const COMPONENTS = {
  DRY_RUN: DeckDryRunView,
  DETAIL: DeckDetailView,
  EDITOR: DeckEditorView,
}

const DeckBuilderPage = ({ settings, cards, ...props }) => {
  const Component = COMPONENTS[props.view]
  const state = useDeckBuilder(props)

  return (
    <Layout
      active={['TOOLS', 'BUILDERS', 'DECK_BUILDER', props.view]}
      settings={settings}
    >
      <Component {...state} advice={props.advice} />
    </Layout>
  )
}

export default DeckBuilderPage
