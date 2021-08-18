import React from 'react'
import FanKitAvatars from '~/components/FanKitAvatars'
import Layout from '~/components/Layout'

const FanKitAvatarsPage = () => (
  <Layout active={['GAME', 'FAN_KIT', 'AVATARS']}>
    <FanKitAvatars />
  </Layout>
)

export default FanKitAvatarsPage
