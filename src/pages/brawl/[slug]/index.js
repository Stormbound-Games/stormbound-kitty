import BrawlPage from '~/components/BrawlPage'
import getGuide from '~/api/guides/getGuide'
import getDecksWithTag from '~/api/decks/getDecksWithTag'
import getBooks from '~/api/books/getBooks'
import indexArray from '~/helpers/indexArray'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getBrawl from '~/api/brawls/getBrawl'
import getBrawls from '~/api/brawls/getBrawls'

export async function getStaticPaths() {
  const brawls = await getBrawls()
  const paths = brawls.map(brawl => ({ params: { slug: brawl.slug } }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const brawl = await getBrawl({ slug: params.slug, isPreview })
  const guide = await getGuide({ name: brawl.title, isPreview })
  const recommendedDecks = await getDecksWithTag({ tag: brawl.id, isPreview })
  const books = await getBooks({ isPreview })
  const booksIndex = indexArray(books)
  const recommendedDeck = recommendedDecks[0] || null

  if (!brawl) {
    return { notFound: true }
  }

  const settings = await getSiteSettings({ isPreview })

  return {
    props: {
      booksIndex,
      settings,
      brawl,
      guide,
      recommendedDeck,
      breadcrumbs: ['TOOLS', 'YOUR_CONTENT', 'BRAWL_TRACKER'],
    },
  }
}

export default BrawlPage
