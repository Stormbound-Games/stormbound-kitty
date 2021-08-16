import React from 'react'
import FanArt from '~/components/FanArt'
import Layout from '~/components/Layout'

export default () => (
  <Layout active={['GAME', 'FAN_ART']}>
    <FanArt />
  </Layout>
)
