import React from 'react'
import ValueCalculator from '~/components/ValueCalculator'
import Layout from '~/components/Layout'
import serialisation from '~/helpers/serialisation'

export async function getStaticPaths() {
  return { paths: [], fallback: true }
}

export async function getStaticProps(context) {
  const defaultCard = { id: null, level: 1 }

  try {
    const cards = serialisation.cards.deserialise(context.params.id)
    return {
      props: { cards: [cards[0] || defaultCard, cards[1] || defaultCard] },
    }
  } catch (error) {
    return { props: { cards: [defaultCard, defaultCard] } }
  }
}

const ValueCalculatorPage = props => (
  <Layout active={['TOOLS', 'VALUE_CALCULATOR']}>
    <ValueCalculator cards={props.cards} />
  </Layout>
)

export default ValueCalculatorPage
