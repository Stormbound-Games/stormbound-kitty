import React from 'react'
import BookOpeningSimulator from '~/components/BookOpeningSimulator'
import Layout from '~/components/Layout'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import serialization from '~/helpers/serialization'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticPaths() {
  return { paths: [{ params: { id: null } }], fallback: 'blocking' }
}

export async function getStaticProps(context) {
  const isPreview = context.preview || false
  const [id] = context.params.id || []
  const navigation = await getNavigation({ isPreview })

  try {
    const cards = serialization.cards.deserialize(id).map(getResolvedCardData)

    return { props: { navigation, cards } }
  } catch (error) {
    return { props: { navigation, cards: [] } }
  }
}

const BookOpeningSimulatorPage = ({ navigation, ...props }) => (
  <Layout
    active={['TOOLS', 'SIMULATORS', 'BOOK_SIMULATOR']}
    navigation={navigation}
  >
    <BookOpeningSimulator {...props} />
  </Layout>
)

export default BookOpeningSimulatorPage
