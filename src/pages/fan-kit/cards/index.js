import React from 'react'
import FanKitCards from '~/components/FanKitCards'
import Layout from '~/components/Layout'

export default () => (
  <Layout active={['GAME', 'FAN_KIT', 'CARDS']}>
    <FanKitCards />
  </Layout>
)
