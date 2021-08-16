import React from 'react'
import DeckCollection from '~/components/DeckCollection'
import Layout from '~/components/Layout'

export default () => (
  <Layout active={['TOOLS', 'DECK_COLLECTION']}>
    <DeckCollection />
  </Layout>
)
