import React from 'react'
import CardsStats from '~/components/CardsStats'
import Layout from '~/components/Layout'

const CardStatsPage = () => (
  <Layout active={['GAME', 'CARD_STATS']}>
    <CardsStats />
  </Layout>
)

export default CardStatsPage
