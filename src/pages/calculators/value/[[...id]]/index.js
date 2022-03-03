import React from 'react'
import ValueCalculator from '~/components/ValueCalculator'
import Layout from '~/components/Layout'
import getCardValue from '~/helpers/getCardValue'
import getSiteSettings from '~/api/misc/getSiteSettings'
import serialization from '~/helpers/serialization'
import indexArray from '~/helpers/indexArray'
import getCards from '~/api/cards/getCards'

export async function getStaticPaths() {
  return { paths: [{ params: { id: null } }], fallback: 'blocking' }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const settings = await getSiteSettings({ isPreview })
  const cardsIndex = indexArray(cards)
  const [id] = params.id || []
  const defaultCard = { id: null, level: 1 }
  const disabledOptions = cards
    .map(card => card.id)
    .filter(id => !getCardValue(cardsIndex, id))
  const deck = id ? serialization.cards.deserialize(id) : []

  if (deck.some(card => !(card.id in cardsIndex))) {
    return { notFound: true }
  }

  return {
    props: {
      cards,
      settings,
      deck: [deck[0] || defaultCard, deck[1] || defaultCard],
      disabledOptions,
    },
  }
}

const ValueCalculatorPage = ({ settings, cards, ...props }) => (
  <Layout
    active={['TOOLS', 'CALCULATORS', 'VALUE_CALCULATOR']}
    settings={settings}
  >
    <ValueCalculator {...props} />
  </Layout>
)

export default ValueCalculatorPage
