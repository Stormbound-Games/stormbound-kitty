import React from 'react'
import DeckEditorView from '~/components/DeckEditorView'
import DeckDetailView from '~/components/DeckDetailView'
import DeckDryRunView from '~/components/DeckDryRunView'
import Layout from '~/components/Layout'
import getDeck from '~/api/decks/getDeck'
import getDecks from '~/api/decks/getDecks'
import getDeckAdvice from '~/helpers/getDeckAdvice'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import getInitialDeckData from '~/helpers/getInitialDeckData'
import getNavigation from '~/helpers/getNavigation'
import useDeckBuilder from '~/hooks/useDeckBuilder'
import CARDS from '~/data/cards'

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
  const navigation = await getNavigation({ isPreview })
  const DEFAULT_PROPS = {
    cards: CARDS,
    navigation,
    id: null,
    deck: [],
    advice: [],
    view: 'EDITOR',
    suggestedDeck: null,
  }

  try {
    const [id, view] = params.rest || []

    if (
      ['dry-run', 'detail'].includes(id) ||
      (view && !['dry-run', 'detail'].includes(view))
    ) {
      return { notFound: true }
    }

    if (!id) {
      return { props: DEFAULT_PROPS }
    }

    const deck = getInitialDeckData(id)
    const resolvedDeck = deck.map(getResolvedCardData)
    const advice = view === 'detail' ? await getDeckAdvice(resolvedDeck) : []
    const resolvedView =
      view === 'dry-run' ? 'DRY_RUN' : view === 'detail' ? 'DETAIL' : 'EDITOR'
    const suggestedDeck = await getDeck({ id, isPreview })

    return {
      props: {
        navigation,
        id,
        deck,
        advice,
        view: resolvedView,
        suggestedDeck,
      },
    }
  } catch (error) {
    return { props: DEFAULT_PROPS }
  }
}

const COMPONENTS = {
  DRY_RUN: DeckDryRunView,
  DETAIL: DeckDetailView,
  EDITOR: DeckEditorView,
}

const DeckBuilderPage = ({ navigation, cards, ...props }) => {
  const Component = COMPONENTS[props.view]
  const state = useDeckBuilder(props)

  return (
    <Layout
      active={['TOOLS', 'BUILDERS', 'DECK_BUILDER', props.view]}
      navigation={navigation}
      cards={cards}
    >
      <Component {...state} advice={props.advice} />
    </Layout>
  )
}

export default DeckBuilderPage
