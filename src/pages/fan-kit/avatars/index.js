import React from 'react'
import FanKitAvatars from '~/components/FanKitAvatars'
import Layout from '~/components/Layout'

export default () => (
  <Layout active={['GAME', 'FAN_KIT', 'AVATARS']}>
    <FanKitAvatars />
  </Layout>
)
