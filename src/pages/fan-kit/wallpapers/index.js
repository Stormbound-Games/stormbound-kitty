import React from 'react'
import FanKitWallpapers from '~/components/FanKitWallpapers'
import Layout from '~/components/Layout'

export default () => (
  <Layout active={['GAME', 'FAN_KIT', 'WALLPAPERS']}>
    <FanKitWallpapers />
  </Layout>
)
