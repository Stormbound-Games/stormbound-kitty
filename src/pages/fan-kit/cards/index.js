import React from 'react'
import FanKitCards from '~/components/FanKitCards'
import Layout from '~/components/Layout'
import CARDS from '~/data/cards'

export async function getStaticProps() {
  return { props: { cards: CARDS } }
}

const FanKitCardsPage = props => (
  <Layout active={['GAME', 'FAN_KIT', 'CARDS']}>
    <FanKitCards cards={props.cards} />
  </Layout>
)

export default FanKitCardsPage
