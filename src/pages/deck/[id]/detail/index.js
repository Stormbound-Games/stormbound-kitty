import React from 'react'
import DeckDetailView from '~/components/DeckDetailView'
import DeckBuilderRoot from '~/components/DeckBuilderRoot'
import Layout from '~/components/Layout'
export { getStaticPaths, getStaticProps } from '../'

export default props => (
  <Layout active={['TOOLS', 'DECK_BUILDER', 'DETAIL']}>
    <DeckBuilderRoot view='DETAIL' deckId={props.id} deck={props.deck}>
      {state => <DeckDetailView {...state} />}
    </DeckBuilderRoot>
  </Layout>
)
