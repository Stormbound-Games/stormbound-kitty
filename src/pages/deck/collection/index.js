import React from 'react'
import DeckCollection from '~/components/DeckCollection'
import Layout from '~/components/Layout'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getDeckTags from '~/api/decks/getDeckTags'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const availableTags = await getDeckTags({ isPreview })

  return { props: { settings, availableTags } }
}

const DeckCollectionPage = ({ settings, ...props }) => (
  <Layout
    active={['YOUR_CONTENT', 'YOUR_CONTENT', 'DECK_COLLECTION']}
    settings={settings}
  >
    <DeckCollection {...props} />
  </Layout>
)

export default DeckCollectionPage
