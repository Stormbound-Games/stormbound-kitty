import React from 'react'
import FanKitWallpapers from '~/components/FanKitWallpapers'
import Layout from '~/components/Layout'

const FanKitWallpapersPage = () => (
  <Layout active={['GAME', 'FAN_KIT', 'WALLPAPERS']}>
    <FanKitWallpapers />
  </Layout>
)

export default FanKitWallpapersPage
