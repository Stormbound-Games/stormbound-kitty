import React from 'react'
import DeckEditorView from '~/components/DeckEditorView'
import DeckBuilderRoot from '~/components/DeckBuilderRoot'
import Layout from '~/components/Layout'

export default () => (
  <Layout active={['TOOLS', 'DECK_BUILDER', 'EDITOR']}>
    <DeckBuilderRoot view='EDITOR' deckId='' deck={[]}>
      {state => <DeckEditorView {...state} />}
    </DeckBuilderRoot>
  </Layout>
)
