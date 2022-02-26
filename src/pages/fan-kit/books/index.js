import React from 'react'
import FanKitBooks from '~/components/FanKitBooks'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'
import CARDS from '~/data/cards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = CARDS
  const navigation = await getNavigation({ isPreview })

  return { props: { cards, navigation } }
}

const FanKitBooksPage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['GAME', 'INFORMATION', 'FAN_KIT']}
    navigation={navigation}
    cards={cards}
  >
    <FanKitBooks {...props} />
  </Layout>
)

export default FanKitBooksPage
