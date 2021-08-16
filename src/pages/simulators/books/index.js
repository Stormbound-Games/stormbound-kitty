import React from 'react'
import BookOpeningSimulator from '~/components/BookOpeningSimulator'
import Layout from '~/components/Layout'

const BookOpeningSimulatorPage = () => (
  <Layout active={['TOOLS', 'BOOK_SIMULATOR']}>
    <BookOpeningSimulator cards={[]} />
  </Layout>
)

export default BookOpeningSimulatorPage
