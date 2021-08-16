import React from 'react'
import BooksCalculator from '~/components/BooksCalculator'
import Layout from '~/components/Layout'

export default () => (
  <Layout active={['TOOLS', 'BOOKS_CALCULATOR']}>
    <BooksCalculator />
  </Layout>
)
