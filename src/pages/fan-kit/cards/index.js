import React from 'react'
import FanKitCards from '~/components/FanKitCards'
import Layout from '~/components/Layout'
import CARDS from '~/data/cards'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = CARDS
  const navigation = await getNavigation({ isPreview })

  return { props: { cards, navigation } }
}

const FanKitCardsPage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['GAME', 'INFORMATION', 'FAN_KIT']}
    navigation={navigation}
    cards={cards}
  >
    <FanKitCards {...props} cards={cards} />
  </Layout>
)

export default FanKitCardsPage
