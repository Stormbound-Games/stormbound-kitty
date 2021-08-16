import React from 'react'
import FanKitBooks from '~/components/FanKitBooks'
import Layout from '~/components/Layout'

export default () => (
  <Layout active={['GAME', 'FAN_KIT', 'BOOKS']}>
    <FanKitBooks />
  </Layout>
)
