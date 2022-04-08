import React from 'react'
import DeckEditorView from '~/components/DeckEditorView'
import DeckDetailView from '~/components/DeckDetailView'
import DeckDryRunView from '~/components/DeckDryRunView'
import getDeck from '~/api/decks/getDeck'
import getDecks from '~/api/decks/getDecks'
import getDeckAdvice from '~/helpers/getDeckAdvice'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import getSiteSettings from '~/api/misc/getSiteSettings'
import indexArray from '~/helpers/indexArray'
import getDeckPresets from '~/helpers/getDeckPresets'
import serialization from '~/helpers/serialization'
import useDeckBuilder from '~/hooks/useDeckBuilder'
import getBrawls from '~/api/brawls/getBrawls'

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
  const brawls = await getBrawls({ isPreview })
  const settings = await getSiteSettings({ isPreview })
  const cardsIndex = indexArray(settings.cards)
  const cardsIndexBySid = indexArray(settings.cards, 'sid')
  const [id, view] = params.rest || []
  const resolvedView =
    view === 'dry-run' ? 'DRY_RUN' : view === 'detail' ? 'DETAIL' : 'EDITOR'
  const breadcrumbs = ['TOOLS', 'BUILDERS', 'DECK_BUILDER', resolvedView]

  if (
    ['dry-run', 'detail'].includes(id) ||
    (view && !['dry-run', 'detail'].includes(view))
  ) {
    return { notFound: true }
  }

  if (!id) {
    return {
      props: {
        brawls: brawls.map(brawl => ({ id: brawl.id })),
        settings,
        id: null,
        deck: [],
        advice: [],
        view: 'EDITOR',
        suggestedDeck: null,
        preset: getDeckPresets(),
        breadcrumbs,
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
  const suggestedDeck = await getDeck({ id, isPreview })

  return {
    props: {
      brawls: view ? brawls : [],
      settings,
      id,
      deck,
      advice,
      view: resolvedView,
      suggestedDeck,
      preset: getDeckPresets(brawls, suggestedDeck),
      breadcrumbs,
    },
  }
}

const COMPONENTS = {
  DRY_RUN: DeckDryRunView,
  DETAIL: DeckDetailView,
  EDITOR: DeckEditorView,
}

const DeckBuilderPage = props => {
  const state = useDeckBuilder(props)
  const View = COMPONENTS[props.view]

  return <View {...state} brawls={props.brawls} />
}

export default DeckBuilderPage
