import React from 'react'
import DeckSuggestions from '~/components/DeckSuggestions'
import Layout from '~/components/Layout'

export default () => (
  <Layout active={['COMMUNITY', 'DECK_SUGGESTIONS']}>
    <DeckSuggestions />
  </Layout>
)
