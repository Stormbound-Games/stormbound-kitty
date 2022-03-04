import React from 'react'
import IncomeCalculator from '~/components/IncomeCalculator'
import Layout from '~/components/Layout'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getBooks from '~/api/books/getBooks'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const books = await getBooks({ isPreview })

  return { props: { settings, books } }
}

const IncomeCalculatorPage = ({ settings, cards, ...props }) => (
  <Layout
    active={['TOOLS', 'CALCULATORS', 'INCOME_CALCULATOR']}
    settings={settings}
  >
    <IncomeCalculator {...props} />
  </Layout>
)

export default IncomeCalculatorPage
