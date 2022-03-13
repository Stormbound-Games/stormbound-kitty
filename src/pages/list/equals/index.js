import React from 'react'
import EqualsList from '~/components/EqualsList'
import Layout from '~/components/Layout'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getEqualTierList from '~/api/misc/getEqualTierList'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const equalTierList = await getEqualTierList({ isPreview })

  return {
    props: {
      settings,
      date: equalTierList.date,
      list: equalTierList.tiers,
    },
  }
}

const EqualsListPage = ({ settings, ...props }) => (
  <Layout active={['COMMUNITY', 'META', 'EQUALS_LIST']} settings={settings}>
    <EqualsList {...props} />
  </Layout>
)

export default EqualsListPage
