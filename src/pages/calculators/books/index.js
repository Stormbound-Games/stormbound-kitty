import React from 'react'
import BooksCalculator from '~/components/BooksCalculator'
import Layout from '~/components/Layout'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getBooks from '~/api/books/getBooks'
import getCards from '~/api/cards/getCards'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const cards = await getCards({ isPreview })
  const books = await getBooks({ isPreview })

  return {
    props: {
      settings,
      books,
      cards: cards.map(card => ({ rarity: card.rarity })),
    },
  }
}

const BooksCalculatorPage = ({ settings, cards, ...props }) => (
  <Layout
    active={['TOOLS', 'CALCULATORS', 'BOOKS_CALCULATOR']}
    settings={settings}
  >
    <BooksCalculator {...props} />
  </Layout>
)

export default BooksCalculatorPage
