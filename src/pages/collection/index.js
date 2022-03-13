import React from 'react'
import Collection from '~/components/Collection'
import Layout from '~/components/Layout'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })

  return { props: { settings } }
}

const CollectionPage = ({ settings, ...props }) => (
  <Layout
    active={['YOUR_CONTENT', 'YOUR_CONTENT', 'COLLECTION']}
    settings={settings}
  >
    <Collection {...props} />
  </Layout>
)

export default CollectionPage
