import React from 'react'
import CardsStats from '~/components/CardsStats'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'
import getCards from '~/api/cards/getCards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const navigation = await getNavigation({ isPreview })

  return {
    props: { cards, navigation },
  }
}

const CardStatsPage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['GAME', 'INFORMATION', 'CARD_STATS']}
    navigation={navigation}
  >
    <CardsStats {...props} cards={cards} />
  </Layout>
)

export default CardStatsPage
