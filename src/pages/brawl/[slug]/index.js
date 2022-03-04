import React from 'react'
import BrawlPage from '~/components/BrawlPage'
import Layout from '~/components/Layout'
import { BRAWLS, BRAWL_INDEX } from '~/constants/brawl'
import getGuide from '~/api/guides/getGuide'
import getDecksWithTag from '~/api/decks/getDecksWithTag'
import getCards from '~/api/cards/getCards'
import getBooks from '~/api/books/getBooks'
import indexArray from '~/helpers/indexArray'
import getSiteSettings from '~/api/misc/getSiteSettings'
import serialization from '~/helpers/serialization'

export async function getStaticPaths() {
  const paths = BRAWLS.map(brawl => ({
    params: { slug: brawl.id.replace(/_/g, '-').toLowerCase() },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const id = params.slug.toUpperCase().replace(/-/g, '_')
  const brawl = BRAWL_INDEX[id]
  const guide = await getGuide({ name: brawl.title, isPreview })
  const recommendedDecks = await getDecksWithTag({ tag: id, isPreview })
  const books = await getBooks({ isPreview })
  const booksIndex = indexArray(books)
  const recommendedDeck = recommendedDecks[0] || null
  const indexedDeck = recommendedDeck
    ? indexArray(
        serialization.deck.deserialize(
          indexArray(cards, 'sid'),
          recommendedDeck.id
        )
      )
    : {}

  if (!brawl) {
    return { notFound: true }
  }

  const settings = await getSiteSettings({ isPreview })

  return {
    props: {
      booksIndex,
      cards: cards.filter(
        card => card.id === brawl.cardId || card.id in indexedDeck
      ),
      settings,
      id,
      brawl,
      guide,
      recommendedDeck,
    },
  }
}

const BrawlTrackerPage = ({ settings, cards, ...props }) => (
  <Layout
    active={['TOOLS', 'YOUR_CONTENT', 'BRAWL_TRACKER']}
    settings={settings}
  >
    <BrawlPage {...props} />
  </Layout>
)

export default BrawlTrackerPage
