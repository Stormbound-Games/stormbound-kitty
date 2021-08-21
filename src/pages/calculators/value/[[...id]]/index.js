import React from 'react'
import ValueCalculator from '~/components/ValueCalculator'
import Layout from '~/components/Layout'
import getCardValue from '~/helpers/getCardValue'
import getNavigation from '~/helpers/getNavigation'
import serialisation from '~/helpers/serialisation'
import CARDS from '~/data/cards'

export async function getStaticPaths() {
  return { paths: [{ params: { id: null } }], fallback: true }
}

export async function getStaticProps(context) {
  const navigation = getNavigation()
  const [id] = context.params.id || []
  const defaultCard = { id: null, level: 1 }
  const disabledOptions = CARDS.map(card => card.id).filter(
    id => !getCardValue(id)
  )

  try {
    const cards = serialisation.cards.deserialise(id)
    return {
      props: {
        navigation,
        cards: [cards[0] || defaultCard, cards[1] || defaultCard],
        disabledOptions,
      },
    }
  } catch (error) {
    return {
      props: { navigation, cards: [defaultCard, defaultCard], disabledOptions },
    }
  }
}

const ValueCalculatorPage = props => (
  <Layout
    active={['TOOLS', 'CALCULATORS', 'VALUE_CALCULATOR']}
    navigation={props.navigation}
  >
    <ValueCalculator
      cards={props.cards}
      disabledOptions={props.disabledOptions}
    />
  </Layout>
)

export default ValueCalculatorPage
