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

export async function getStaticProps(context) {
  const params = context.params.rest || []
  const navigation = getNavigation()
  const DEFAULT_PROPS = {
    navigation,
    id: null,
    deck: [],
    advice: [],
    view: 'EDITOR',
    suggestedDeck: null,
  }

  try {
    const [id, view] = params

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
    const suggestedDeck = await getDeck(id)

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

const DeckBuilderPage = ({ navigation, ...props }) => {
  const Component = COMPONENTS[props.view]
  const state = useDeckBuilder(props)

  return (
    <Layout
      active={['TOOLS', 'BUILDERS', 'DECK_BUILDER', props.view]}
      navigation={navigation}
    >
      <Component {...state} advice={props.advice} />
    </Layout>
  )
}

export default DeckBuilderPage
