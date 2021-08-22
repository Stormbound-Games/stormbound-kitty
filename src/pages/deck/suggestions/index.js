import React from 'react'
import DeckSuggestions from '~/components/DeckSuggestions'
import Layout from '~/components/Layout'
import DECKS from '~/data/decks'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  return { props: { navigation: getNavigation(), decks: DECKS } }
}

const DeckSuggestionsPage = props => (
  <Layout
    active={['COMMUNITY', 'META', 'DECK_SUGGESTIONS']}
    navigation={props.navigation}
  >
    <DeckSuggestions decks={props.decks} />
  </Layout>
)

export default DeckSuggestionsPage
