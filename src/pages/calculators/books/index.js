import React from 'react'
import BooksCalculator from '~/components/BooksCalculator'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  return { props: { navigation: getNavigation() } }
}

const BooksCalculatorPage = props => (
  <Layout
    active={['TOOLS', 'CALCULATORS', 'BOOKS_CALCULATOR']}
    navigation={props.navigation}
  >
    <BooksCalculator />
  </Layout>
)

export default BooksCalculatorPage
