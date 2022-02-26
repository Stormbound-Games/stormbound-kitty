import React from 'react'
import Members from '~/components/Members'
import Layout from '~/components/Layout'
import getMembersList from '~/helpers/getMembersList'
import getNavigation from '~/helpers/getNavigation'
import CARDS from '~/data/cards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = CARDS
  const members = await getMembersList({ isPreview })
  const navigation = await getNavigation({ isPreview })

  return { props: { cards, navigation, members }, revalidate: 60 * 60 * 24 * 7 }
}

const MembersPage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['COMMUNITY', 'DISCOVER', 'MEMBERS']}
    navigation={navigation}
    cards={cards}
  >
    <Members {...props} />
  </Layout>
)

export default MembersPage
