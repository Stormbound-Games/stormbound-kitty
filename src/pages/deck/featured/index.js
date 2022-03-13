import React from 'react'
import FeaturedDecks from '~/components/FeaturedDecks'
import Layout from '~/components/Layout'
import getDecks from '~/api/decks/getDecks'
import getDeckTags from '~/api/decks/getDeckTags'
import getSiteSettings from '~/api/misc/getSiteSettings'

// This page uses server-side rendering instead of static rendering because it
// receives query parameters (for filtering) that need to be handled on the
// server. This matters both to avoid decks flashing when JavaScript mounts but
// also because the meta tags are based on the query parameters so the Discord
// embeds look alright.
export async function getServerSideProps({ preview: isPreview = false }) {
  const decks = await getDecks({ isPreview })
  const settings = await getSiteSettings({ isPreview })
  const availableTags = await getDeckTags({ isPreview })

  return { props: { decks, settings, availableTags } }
}

const FeaturedDecksPage = ({ settings, ...props }) => (
  <Layout active={['COMMUNITY', 'META', 'FEATURED_DECKS']} settings={settings}>
    <FeaturedDecks {...props} />
  </Layout>
)

export default FeaturedDecksPage
