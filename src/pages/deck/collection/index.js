import PageDeckCollection from '~/components/PageDeckCollection'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getDeckTags from '~/api/decks/getDeckTags'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const availableTags = await getDeckTags({ isPreview })

  return {
    props: {
      settings,
      availableTags,
      breadcrumbs: ['YOUR_CONTENT', 'YOUR_CONTENT', 'DECK_COLLECTION'],
    },
  }
}

export default PageDeckCollection
