import React from 'react'
import CardsStats from '~/components/CardsStats'
import Layout from '~/components/Layout'

export default () => (
  <Layout active={['GAME', 'CARD_STATS']}>
    <CardsStats />
  </Layout>
)
