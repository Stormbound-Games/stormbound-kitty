import React from 'react'
import BookOpeningSimulator from '~/components/BookOpeningSimulator'
import Layout from '~/components/Layout'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import serialization from '~/helpers/serialization'
import getNavigation from '~/helpers/getNavigation'
import indexArray from '~/helpers/indexArray'
import getCards from '~/api/cards/getCards'

export async function getStaticPaths() {
  return { paths: [{ params: { id: null } }], fallback: 'blocking' }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const navigation = await getNavigation({ isPreview })
  const [id] = params.id || []
  const cardsIndex = indexArray(cards)

  try {
    const deck = serialization.cards
      .deserialize(id)
      .map(card => getResolvedCardData(cardsIndex, card))

    return { props: { cards, navigation, deck } }
  } catch (error) {
    return { props: { cards, navigation, deck: [] } }
  }
}

const BookOpeningSimulatorPage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['TOOLS', 'SIMULATORS', 'BOOK_SIMULATOR']}
    navigation={navigation}
  >
    <BookOpeningSimulator {...props} />
  </Layout>
)

export default BookOpeningSimulatorPage
