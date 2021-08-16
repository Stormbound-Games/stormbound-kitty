import React from 'react'
import BookOpeningSimulator from '~/components/BookOpeningSimulator'
import Layout from '~/components/Layout'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import serialisation from '~/helpers/serialisation'

export async function getStaticPaths() {
  return { paths: [], fallback: true }
}

export async function getStaticProps(context) {
  const [id] = context.params.id

  try {
    const cards = serialisation.cards.deserialise(id).map(getResolvedCardData)

    return { props: { cards } }
  } catch (error) {
    return { props: { cards: [] } }
  }
}

const BookOpeningSimulatorPage = props => (
  <Layout active={['TOOLS', 'BOOK_SIMULATOR']}>
    <BookOpeningSimulator cards={props.cards} />
  </Layout>
)

export default BookOpeningSimulatorPage
