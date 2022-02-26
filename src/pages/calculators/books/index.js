import React from 'react'
import BooksCalculator from '~/components/BooksCalculator'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'
import CARDS from '~/data/cards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = CARDS
  const navigation = await getNavigation({ isPreview })

  return { props: { cards, navigation } }
}

const BooksCalculatorPage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['TOOLS', 'CALCULATORS', 'BOOKS_CALCULATOR']}
    navigation={navigation}
    cards={cards}
  >
    <BooksCalculator {...props} />
  </Layout>
)

export default BooksCalculatorPage
