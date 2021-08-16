import React from 'react'
import DeckDryRunView from '~/components/DeckDryRunView'
import DeckBuilderRoot from '~/components/DeckBuilderRoot'
import Layout from '~/components/Layout'
export { getStaticPaths, getStaticProps } from '../'

export default props => (
  <Layout active={['TOOLS', 'DECK_BUILDER', 'DRY_RUN']}>
    <DeckBuilderRoot view='DRY_RUN' deckId={props.id} deck={props.deck}>
      {state => <DeckDryRunView {...state} />}
    </DeckBuilderRoot>
  </Layout>
)
