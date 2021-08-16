import React from 'react'
import DeckCollection from '~/components/DeckCollection'
import Layout from '~/components/Layout'

const DeckCollectionPage = () => (
  <Layout active={['TOOLS', 'DECK_COLLECTION']}>
    <DeckCollection />
  </Layout>
)

export default DeckCollectionPage
