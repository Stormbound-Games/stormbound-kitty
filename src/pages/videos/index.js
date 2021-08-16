import React from 'react'
import Videos from '~/components/Videos'
import Layout from '~/components/Layout'

export default () => (
  <Layout active={['COMMUNITY', 'VIDEOS']}>
    <Videos />
  </Layout>
)
