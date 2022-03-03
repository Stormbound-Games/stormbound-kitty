import React from 'react'
import BookOpeningSimulator from '~/components/BookOpeningSimulator'
import Layout from '~/components/Layout'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import serialization from '~/helpers/serialization'
import getSiteSettings from '~/api/misc/getSiteSettings'
import indexArray from '~/helpers/indexArray'
import getCards from '~/api/cards/getCards'

export async function getStaticPaths() {
  return { paths: [{ params: { id: null } }], fallback: 'blocking' }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const settings = await getSiteSettings({ isPreview })
  const [id] = params.id || []
  const cardsIndex = indexArray(cards)

  try {
    const deck = serialization.cards
      .deserialize(id)
      .map(card => getResolvedCardData(cardsIndex, card))

    return { props: { cards, settings, deck } }
  } catch (error) {
    return { props: { cards, settings, deck: [] } }
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
