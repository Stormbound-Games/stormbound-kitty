import React from 'react'
import FanKitBackgrounds from '~/components/FanKitBackgrounds'
import Layout from '~/components/Layout'

export default () => (
  <Layout active={['GAME', 'FAN_KIT', 'BACKGROUNDS']}>
    <FanKitBackgrounds />
  </Layout>
)
