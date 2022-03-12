import React from 'react'
import RankedList from '~/components/RankedList'
import Layout from '~/components/Layout'
import getInitialListData from '~/helpers/getInitialListData'
import getLiveTierList from '~/helpers/getLiveTierList'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const tierList = await getLiveTierList({ isPreview })
  const settings = await getSiteSettings({ isPreview })
  const list = getInitialListData(tierList)

  return {
    props: { settings, list },
    revalidate: 60 * 60 * 24 * 7,
  }
}

const RankedListPage = ({ settings, ...props }) => (
  <Layout active={['COMMUNITY', 'META', 'RANKED_LIST']} settings={settings}>
    <RankedList {...props} />
  </Layout>
)

export default RankedListPage
