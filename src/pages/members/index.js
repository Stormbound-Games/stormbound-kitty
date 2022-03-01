import React from 'react'
import Members from '~/components/Members'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'
import getCards from '~/api/cards/getCards'
import getUsers from '~/api/users/getUsers'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const members = await getUsers({ isPreview })
  const navigation = await getNavigation({ isPreview })

  return { props: { cards, navigation, members }, revalidate: 60 * 60 * 24 * 7 }
}

const MembersPage = ({ navigation, cards, ...props }) => (
  <Layout active={['COMMUNITY', 'DISCOVER', 'MEMBERS']} navigation={navigation}>
    <Members {...props} />
  </Layout>
)

export default MembersPage
