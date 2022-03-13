import React from 'react'
import BrawlIndex from '~/components/BrawlIndex'
import Layout from '~/components/Layout'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getBrawls from '~/api/brawls/getBrawls'

export async function getStaticProps({ preview: isPreview = false }) {
  const brawls = await getBrawls({ isPreview })
  const settings = await getSiteSettings({ isPreview })

  return { props: { brawls, settings } }
}

const BrawlIndexPage = ({ settings, ...props }) => (
  <Layout
    active={['YOUR_CONTENT', 'YOUR_CONTENT', 'BRAWL_TRACKER']}
    settings={settings}
  >
    <BrawlIndex {...props} />
  </Layout>
)

export default BrawlIndexPage
