import React from 'react'
import DeckCollection from '~/components/DeckCollection'
import Layout from '~/components/Layout'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getDeckTags from '~/api/decks/getDeckTags'
import getCards from '~/api/cards/getCards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const settings = await getSiteSettings({ isPreview })
  const availableTags = await getDeckTags({ isPreview })

  return { props: { cards, settings, availableTags } }
}

const DeckCollectionPage = ({ settings, cards, ...props }) => (
  <Layout
    active={['YOUR_CONTENT', 'YOUR_CONTENT', 'DECK_COLLECTION']}
    settings={settings}
  >
    <DeckCollection {...props} />
  </Layout>
)

export default DeckCollectionPage
