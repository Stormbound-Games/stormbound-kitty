import React from 'react'
import FanKitBackgrounds from '~/components/FanKitBackgrounds'
import Layout from '~/components/Layout'

const FanKitBackgroundsPage = () => (
  <Layout active={['GAME', 'FAN_KIT', 'BACKGROUNDS']}>
    <FanKitBackgrounds />
  </Layout>
)

export default FanKitBackgroundsPage
