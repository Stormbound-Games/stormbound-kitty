import React from 'react'
import FanKitBooks from '~/components/FanKitBooks'
import Layout from '~/components/Layout'

const FanKitBooksPage = () => (
  <Layout active={['GAME', 'FAN_KIT', 'BOOKS']}>
    <FanKitBooks />
  </Layout>
)

export default FanKitBooksPage
