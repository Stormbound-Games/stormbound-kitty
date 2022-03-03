import React from 'react'
import BrawlCalculator from '~/components/BrawlCalculator'
import Layout from '~/components/Layout'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getCards from '~/api/cards/getCards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const settings = await getSiteSettings({ isPreview })

  return { props: { cards, settings } }
}

const BrawlCalculatorPage = ({ settings, cards, ...props }) => (
  <Layout
    active={['TOOLS', 'CALCULATORS', 'BRAWL_CALCULATOR']}
    settings={settings}
  >
    <BrawlCalculator {...props} />
  </Layout>
)

export default BrawlCalculatorPage
