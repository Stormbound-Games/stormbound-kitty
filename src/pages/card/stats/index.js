import React from 'react'
import CardsStats from '~/components/CardsStats'
import Layout from '~/components/Layout'
import CARDS from '~/data/cards'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps({ preview: isPreview = false }) {
  return {
    props: { navigation: await getNavigation({ isPreview }), cards: CARDS },
  }
}

const CardStatsPage = ({ navigation, ...props }) => (
  <Layout
    active={['GAME', 'INFORMATION', 'CARD_STATS']}
    navigation={navigation}
  >
    <CardsStats {...props} />
  </Layout>
)

export default CardStatsPage
