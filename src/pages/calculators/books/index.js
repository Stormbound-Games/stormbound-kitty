import React from 'react'
import BooksCalculator from '~/components/BooksCalculator'
import Layout from '~/components/Layout'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getBooks from '~/api/books/getBooks'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const books = await getBooks({ isPreview })

  return { props: { settings, books } }
}

const BooksCalculatorPage = ({ settings, ...props }) => (
  <Layout
    active={['TOOLS', 'CALCULATORS', 'BOOKS_CALCULATOR']}
    settings={settings}
  >
    <BooksCalculator {...props} />
  </Layout>
)

export default BooksCalculatorPage
