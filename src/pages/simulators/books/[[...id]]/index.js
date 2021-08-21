import React from 'react'
import BookOpeningSimulator from '~/components/BookOpeningSimulator'
import Layout from '~/components/Layout'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import serialisation from '~/helpers/serialisation'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticPaths() {
  return { paths: [{ params: { id: null } }], fallback: true }
}

export async function getStaticProps(context) {
  const navigation = getNavigation()
  const [id] = context.params.id || []

  try {
    const cards = serialisation.cards.deserialise(id).map(getResolvedCardData)

    return { props: { navigation, cards } }
  } catch (error) {
    return { props: { navigation, cards: [] } }
  }
}

const BookOpeningSimulatorPage = props => (
  <Layout
    active={['TOOLS', 'BUILDERS', 'BOOK_SIMULATOR']}
    navigation={props.navigation}
  >
    <BookOpeningSimulator cards={props.cards} />
  </Layout>
)

export default BookOpeningSimulatorPage
