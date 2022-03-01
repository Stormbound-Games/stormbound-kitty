import React from 'react'
import BooksCalculator from '~/components/BooksCalculator'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps({ preview: isPreview = false }) {
  const navigation = await getNavigation({ isPreview })

  return { props: { navigation } }
}

const BooksCalculatorPage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['TOOLS', 'CALCULATORS', 'BOOKS_CALCULATOR']}
    navigation={navigation}
  >
    <BooksCalculator {...props} />
  </Layout>
)

export default BooksCalculatorPage
