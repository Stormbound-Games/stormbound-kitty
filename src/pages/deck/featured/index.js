import FeaturedDecks from '~/components/FeaturedDecks'
import getDecks from '~/api/decks/getDecks'
import getDeckTags from '~/api/decks/getDeckTags'
import getSiteSettings from '~/api/misc/getSiteSettings'

// This page uses server-side rendering instead of static rendering because it
// receives query parameters (for filtering) that need to be handled on the
// server. This matters both to avoid decks flashing when JavaScript mounts but
// also because the meta tags are based on the query parameters so the Discord
// embeds look alright.
export async function getServerSideProps({
  res: response,
  preview: isPreview = false,
}) {
  // This value is considered fresh for 1 minute (s-maxage=60). If a request is
  // repeated within the next 60 seconds, the previously cached value will still
  // be fresh. If the request is repeated before 6 minutes, the cached value
  // will be stale but still render (stale-while-revalidate=359). In th
  // background, a revalidation request will be made to populate the cache with
  // a fresh value. If you refresh the page, you will see the new value.
  response.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=359'
  )

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

export default FeaturedDecks
