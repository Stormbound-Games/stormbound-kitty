import React from 'react'
import FanKitCards from '~/components/FanKitCards'
import Layout from '~/components/Layout'

const FanKitCardsPage = () => (
  <Layout active={['GAME', 'FAN_KIT', 'CARDS']}>
    <FanKitCards />
  </Layout>
)

export default FanKitCardsPage
