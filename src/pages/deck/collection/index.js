import React from 'react'
import DeckCollection from '~/components/DeckCollection'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'
import CARDS from '~/data/cards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = CARDS
  const navigation = await getNavigation({ isPreview })

  return { props: { cards, navigation } }
}

const DeckCollectionPage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['YOUR_CONTENT', 'YOUR_CONTENT', 'DECK_COLLECTION']}
    navigation={navigation}
    cards={cards}
  >
    <DeckCollection {...props} />
  </Layout>
)

export default DeckCollectionPage
