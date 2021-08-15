import React from 'react'
import BookOpeningSimulator from '../../../components/BookOpeningSimulator'
import Layout from '../../../components/Layout'

export default () => (
  <Layout active={['TOOLS', 'BOOK_SIMULATOR']}>
    <BookOpeningSimulator cards={[]} />
  </Layout>
)
