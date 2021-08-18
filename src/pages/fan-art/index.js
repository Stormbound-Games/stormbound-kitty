import React from 'react'
import FanArt from '~/components/FanArt'
import Layout from '~/components/Layout'

const FanArtPage = () => (
  <Layout active={['GAME', 'FAN_ART']}>
    <FanArt />
  </Layout>
)

export default FanArtPage
