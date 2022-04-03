import React from 'react'
import Members from '~/components/Members'
import Layout from '~/components/Layout'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getUsers from '~/api/users/getUsers'

export async function getStaticProps({ preview: isPreview = false }) {
  const members = await getUsers({ isPreview })
  const settings = await getSiteSettings({ isPreview })

  return { props: { settings, members } }
}

const MembersPage = ({ settings, ...props }) => (
  <Layout active={['COMMUNITY', 'DISCOVER', 'MEMBERS']} settings={settings}>
    <Members {...props} />
  </Layout>
)

export default MembersPage
