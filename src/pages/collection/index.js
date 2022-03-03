import React from 'react'
import Collection from '~/components/Collection'
import Layout from '~/components/Layout'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getCards from '~/api/cards/getCards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const settings = await getSiteSettings({ isPreview })

  return { props: { cards, settings } }
}

const CollectionPage = ({ settings, cards, ...props }) => (
  <Layout
    active={['YOUR_CONTENT', 'YOUR_CONTENT', 'COLLECTION']}
    settings={settings}
  >
    <Collection {...props} />
  </Layout>
)

export default CollectionPage
