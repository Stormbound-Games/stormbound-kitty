import React from 'react'
import DeckEditorView from '~/components/DeckEditorView'
import DeckDetailView from '~/components/DeckDetailView'
import DeckDryRunView from '~/components/DeckDryRunView'
import DeckBuilderRoot from '~/components/DeckBuilderRoot'
import Layout from '~/components/Layout'
import getInitialDeckData from '~/helpers/getInitialDeckData'
import DECKS from '~/data/decks'

export async function getStaticPaths() {
  const paths = DECKS.map(deck => ({
    params: { rest: [deck.id, 'detail'] },
  })).concat([{ params: { rest: [] } }])

  return { paths, fallback: true }
}

export async function getStaticProps(context) {
  const params = context.params.rest || []

  try {
    const [id, view] = params

    if (view && !['dry-run', 'detail'].includes(view)) {
      return { notFound: true }
    }

    if (!id) {
      return { props: { deck: [], id: null, view: 'EDITOR' } }
    }

    return {
      props: {
        id,
        deck: getInitialDeckData(id),
        view:
          view === 'dry-run'
            ? 'DRY_RUN'
            : view === 'detail'
            ? 'DETAIL'
            : 'EDITOR',
      },
    }
  } catch (error) {
    return { props: { deck: [], id: null, mode: 'EDITOR' } }
  }
}

const COMPONENTS = {
  DRY_RUN: DeckDryRunView,
  DETAIL: DeckDetailView,
  EDITOR: DeckEditorView,
}

const DeckBuilderPage = props => {
  const Component = COMPONENTS[props.view]

  return (
    <Layout active={['TOOLS', 'DECK_BUILDER', props.view]}>
      <DeckBuilderRoot view={props.view} deckId={props.id} deck={props.deck}>
        {state => <Component {...state} />}
      </DeckBuilderRoot>
    </Layout>
  )
}

export default DeckBuilderPage
