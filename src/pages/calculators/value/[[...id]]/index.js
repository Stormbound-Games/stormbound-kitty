import React from 'react'
import ValueCalculator from '~/components/ValueCalculator'
import Layout from '~/components/Layout'
import getCardValue from '~/helpers/getCardValue'
import getSiteSettings from '~/api/misc/getSiteSettings'
import serialization from '~/helpers/serialization'
import indexArray from '~/helpers/indexArray'

export async function getStaticPaths() {
  return { paths: [{ params: { id: null } }], fallback: 'blocking' }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const cardsIndex = indexArray(settings.cards)
  const [id] = params.id || []
  const defaultCard = { id: null, level: 1 }
  const disabledOptions = settings.cards
    .map(card => card.id)
    .filter(id => !getCardValue(cardsIndex, id))
  const deck = id ? serialization.cards.deserialize(id) : []

  if (deck.some(card => !(card.id in cardsIndex))) {
    return { notFound: true }
  }

  return {
    props: {
      settings,
      deck: [deck[0] || defaultCard, deck[1] || defaultCard],
      disabledOptions,
    },
  }
}

const ValueCalculatorPage = ({ settings, ...props }) => (
  <Layout
    active={['TOOLS', 'CALCULATORS', 'VALUE_CALCULATOR']}
    settings={settings}
  >
    <ValueCalculator {...props} />
  </Layout>
)

export default ValueCalculatorPage
