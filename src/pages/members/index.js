import React from 'react'
import Members from '~/components/Members'
import Layout from '~/components/Layout'

const MembersPage = () => (
  <Layout active={['COMMUNITY', 'MEMBERS']}>
    <Members />
  </Layout>
)

export default MembersPage
