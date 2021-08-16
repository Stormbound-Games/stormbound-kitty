import React from 'react'
import DeckSuggestions from '~/components/DeckSuggestions'
import Layout from '~/components/Layout'

const DeckSuggestionsPage = () => (
  <Layout active={['COMMUNITY', 'DECK_SUGGESTIONS']}>
    <DeckSuggestions />
  </Layout>
)

export default DeckSuggestionsPage
