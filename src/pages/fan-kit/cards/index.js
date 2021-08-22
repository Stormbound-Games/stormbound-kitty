import React from 'react'
import FanKitCards from '~/components/FanKitCards'
import Layout from '~/components/Layout'
import CARDS from '~/data/cards'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  return { props: { navigation: getNavigation(), cards: CARDS } }
}

const FanKitCardsPage = props => (
  <Layout
    active={['GAME', 'INFORMATION', 'FAN_KIT']}
    navigation={props.navigation}
  >
    <FanKitCards cards={props.cards} />
  </Layout>
)

export default FanKitCardsPage
