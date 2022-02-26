import React from 'react'
import CardsStats from '~/components/CardsStats'
import Layout from '~/components/Layout'
import CARDS from '~/data/cards'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = CARDS
  const navigation = await getNavigation({ isPreview })

  return {
    props: { cards, navigation },
  }
}

const CardStatsPage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['GAME', 'INFORMATION', 'CARD_STATS']}
    navigation={navigation}
    cards={cards}
  >
    <CardsStats {...props} cards={cards} />
  </Layout>
)

export default CardStatsPage
