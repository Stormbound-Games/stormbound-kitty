import React from 'react'
import Members from '~/components/Members'
import Layout from '~/components/Layout'
import getMembersList from '~/helpers/getMembersList'

export async function getStaticProps() {
  const members = getMembersList()

  return { props: { members } }
}

const MembersPage = props => (
  <Layout active={['COMMUNITY', 'MEMBERS']}>
    <Members members={props.members} />
  </Layout>
)

export default MembersPage
