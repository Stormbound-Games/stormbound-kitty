import React from 'react'
import BooksCalculator from '~/components/BooksCalculator'
import Layout from '~/components/Layout'

const BooksCalculatorPage = () => (
  <Layout active={['TOOLS', 'BOOKS_CALCULATOR']}>
    <BooksCalculator />
  </Layout>
)

export default BooksCalculatorPage
