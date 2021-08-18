import React from 'react'
import FanKit from '~/components/FanKit'
import Layout from '~/components/Layout'

const FanKitPage = () => (
  <Layout active={['GAME', 'FAN_KIT']}>
    <FanKit />
  </Layout>
)

export default FanKitPage
