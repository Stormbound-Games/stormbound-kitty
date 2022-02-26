import React from 'react'
import BrawlIndex from '~/components/BrawlIndex'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'
import CARDS from '~/data/cards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = CARDS
  const navigation = await getNavigation({ isPreview })

  return { props: { cards, navigation } }
}

const BrawlIndexPage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['YOUR_CONTENT', 'YOUR_CONTENT', 'BRAWL_TRACKER']}
    navigation={navigation}
    cards={cards}
  >
    <BrawlIndex {...props} />
  </Layout>
)

export default BrawlIndexPage
