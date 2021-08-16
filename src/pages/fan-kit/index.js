import React from 'react'
import FanKit from '~/components/FanKit'
import Layout from '~/components/Layout'

export default () => (
  <Layout active={['GAME', 'FAN_KIT']}>
    <FanKit />
  </Layout>
)
