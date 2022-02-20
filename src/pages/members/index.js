import React from 'react'
import Members from '~/components/Members'
import Layout from '~/components/Layout'
import getMembersList from '~/helpers/getMembersList'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  const members = await getMembersList()
  const navigation = getNavigation()

  return { props: { navigation, members } }
}

const MembersPage = ({ navigation, ...props }) => (
  <Layout active={['COMMUNITY', 'DISCOVER', 'MEMBERS']} navigation={navigation}>
    <Members {...props} />
  </Layout>
)

export default MembersPage
