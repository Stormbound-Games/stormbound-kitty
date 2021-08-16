import React from 'react'
import DeckEditorView from '~/components/DeckEditorView'
import DeckBuilderRoot from '~/components/DeckBuilderRoot'
import Layout from '~/components/Layout'
import getInitialDeckData from '~/helpers/getInitialDeckData'
import DECKS from '~/data/decks'

export async function getStaticPaths() {
  const paths = DECKS.map(deck => ({ params: { id: deck.id } }))

  return { paths, fallback: true }
}

export async function getStaticProps(context) {
  const id = context.params.id
  const deck = getInitialDeckData(id)

  return { props: { deck, id } }
}

export default props => (
  <Layout active={['TOOLS', 'DECK_BUILDER', 'EDITOR']}>
    <DeckBuilderRoot view='EDITOR' deckId={props.id} deck={props.deck}>
      {state => <DeckEditorView {...state} />}
    </DeckBuilderRoot>
  </Layout>
)
