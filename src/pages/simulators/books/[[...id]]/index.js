import React from 'react'
import BookOpeningSimulator from '~/components/BookOpeningSimulator'
import Layout from '~/components/Layout'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import serialization from '~/helpers/serialization'
import getNavigation from '~/helpers/getNavigation'
import CARDS from '~/data/cards'

export async function getStaticPaths() {
  return { paths: [{ params: { id: null } }], fallback: 'blocking' }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const navigation = await getNavigation({ isPreview })
  const [id] = params.id || []

  try {
    const cards = serialization.cards.deserialize(id).map(getResolvedCardData)

    return { props: { allCards: CARDS, navigation, cards } }
  } catch (error) {
    return { props: { allCards: CARDS, navigation, cards: [] } }
  }
}

const BookOpeningSimulatorPage = ({ navigation, allCards, ...props }) => (
  <Layout
    active={['TOOLS', 'SIMULATORS', 'BOOK_SIMULATOR']}
    navigation={navigation}
    cards={allCards}
  >
    <BookOpeningSimulator {...props} />
  </Layout>
)

export default BookOpeningSimulatorPage
