import PageFeaturedDecks from '#components/PageFeaturedDecks'
import getDecks from '#api/decks/getDecks'
import getDeckTags from '#api/decks/getDeckTags'
import getSiteSettings from '#api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const decks = await getDecks({ isPreview })
  const settings = await getSiteSettings({ isPreview })
  const availableTags = await getDeckTags({ isPreview })

  return {
    props: {
      decks,
      settings,
      availableTags,
      breadcrumbs: ['COMMUNITY', 'META', 'FEATURED_DECKS'],
    },
  }
}

export default PageFeaturedDecks
