import React from 'react'
import Members from '~/components/Members'
import Layout from '~/components/Layout'
import getMembersList from '~/helpers/getMembersList'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  const members = getMembersList()
  const navigation = getNavigation()

  return { props: { navigation, members } }
}

const MembersPage = props => (
  <Layout
    active={['COMMUNITY', 'DISCOVER', 'MEMBERS']}
    navigation={props.navigation}
  >
    <Members members={props.members} />
  </Layout>
)

export default MembersPage
