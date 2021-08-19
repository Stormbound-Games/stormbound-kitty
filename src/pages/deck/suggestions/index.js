import React from 'react'
import DeckSuggestions from '~/components/DeckSuggestions'
import Layout from '~/components/Layout'
import DECKS from '~/data/decks'

export async function getStaticProps() {
  return { props: { decks: DECKS } }
}

const DeckSuggestionsPage = props => (
  <Layout active={['COMMUNITY', 'DECK_SUGGESTIONS']}>
    <DeckSuggestions decks={props.decks} />
  </Layout>
)

export default DeckSuggestionsPage
