import React from 'react'
import CardsStats from '~/components/CardsStats'
import Layout from '~/components/Layout'
import CARDS from '~/data/cards'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  return { props: { navigation: getNavigation(), cards: CARDS } }
}

const CardStatsPage = props => (
  <Layout
    active={['GAME', 'INFORMATION', 'CARD_STATS']}
    navigation={props.navigation}
  >
    <CardsStats cards={props.cards} />
  </Layout>
)

export default CardStatsPage
