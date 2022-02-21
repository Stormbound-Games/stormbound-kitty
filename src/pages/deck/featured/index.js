import React from 'react'
import FeaturedDecks from '~/components/FeaturedDecks'
import Layout from '~/components/Layout'
import getDecks from '~/api/decks/getDecks'
import getNavigation from '~/helpers/getNavigation'

// This page uses server-side rendering instead of static rendering because it
// receives query parameters (for filtering) that need to be handled on the
// server. This matters both to avoid decks flashing when JavaScript mounts but
// also because the meta tags are based on the query parameters so the Discord
// embeds look alright.
export async function getServerSideProps() {
  return {
    props: { navigation: getNavigation(), decks: await getDecks() },
  }
}

const FeaturedDecksPage = ({ navigation, ...props }) => (
  <Layout
    active={['COMMUNITY', 'META', 'FEATURED_DECKS']}
    navigation={navigation}
  >
    <FeaturedDecks {...props} />
  </Layout>
)

export default FeaturedDecksPage
