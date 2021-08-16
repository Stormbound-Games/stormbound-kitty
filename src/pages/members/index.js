import React from 'react'
import Members from '~/components/Members'
import Layout from '~/components/Layout'

export default () => (
  <Layout active={['COMMUNITY', 'MEMBERS']}>
    <Members />
  </Layout>
)
