import React from 'react'
import Members from '~/components/Members'
import Layout from '~/components/Layout'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getCards from '~/api/cards/getCards'
import getUsers from '~/api/users/getUsers'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const members = await getUsers({ isPreview })
  const settings = await getSiteSettings({ isPreview })

  return {
    props: { cards, settings, members },
    revalidate: 60 * 60 * 24 * 7,
  }
}

const MembersPage = ({ settings, cards, ...props }) => (
  <Layout active={['COMMUNITY', 'DISCOVER', 'MEMBERS']} settings={settings}>
    <Members {...props} />
  </Layout>
)

export default MembersPage
