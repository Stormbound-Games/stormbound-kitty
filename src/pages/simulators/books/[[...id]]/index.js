import React from 'react'
import BookOpeningSimulator from '~/components/BookOpeningSimulator'
import Layout from '~/components/Layout'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import serialization from '~/helpers/serialization'
import getSiteSettings from '~/api/misc/getSiteSettings'
import indexArray from '~/helpers/indexArray'
import getCards from '~/api/cards/getCards'
import FUSION_STONES from '~/constants/fs'

export async function getStaticPaths() {
  return { paths: [{ params: { id: null } }], fallback: 'blocking' }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const cards = (await getCards({ isPreview })).concat(FUSION_STONES)
  const settings = await getSiteSettings({ isPreview })
  const [id] = params.id || []
  const cardsIndex = indexArray(cards)
  const book = id ? serialization.cards.deserialize(id) : []

  if (book.some(card => !(card.id in cardsIndex))) {
    return { notFound: true }
  }

  return {
    props: {
      cards,
      settings,
      book: book.map(card => getResolvedCardData(cardsIndex, card)),
    },
  }
}

const BookOpeningSimulatorPage = ({ settings, cards, ...props }) => (
  <Layout
    active={['TOOLS', 'SIMULATORS', 'BOOK_SIMULATOR']}
    settings={settings}
  >
    <BookOpeningSimulator {...props} />
  </Layout>
)

export default BookOpeningSimulatorPage
