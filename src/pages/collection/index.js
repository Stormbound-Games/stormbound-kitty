import React from 'react'
import Collection from '~/components/Collection'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'
import CARDS from '~/data/cards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = CARDS
  const navigation = await getNavigation({ isPreview })

  return { props: { cards, navigation } }
}

const CollectionPage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['YOUR_CONTENT', 'YOUR_CONTENT', 'COLLECTION']}
    navigation={navigation}
    cards={cards}
  >
    <Collection {...props} />
  </Layout>
)

export default CollectionPage
