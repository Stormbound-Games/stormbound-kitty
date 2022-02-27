import React from 'react'
import ValueCalculator from '~/components/ValueCalculator'
import Layout from '~/components/Layout'
import getCardValue from '~/helpers/getCardValue'
import getNavigation from '~/helpers/getNavigation'
import serialization from '~/helpers/serialization'
import getCards from '~/api/cards/getCards'

export async function getStaticPaths() {
  return { paths: [{ params: { id: null } }], fallback: 'blocking' }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const navigation = await getNavigation({ isPreview })
  const [id] = params.id || []
  const defaultCard = { id: null, level: 1 }
  const disabledOptions = cards
    .map(card => card.id)
    .filter(id => !getCardValue(id))

  try {
    const deck = serialization.cards.deserialize(id)
    return {
      props: {
        cards,
        navigation,
        deck: [deck[0] || defaultCard, deck[1] || defaultCard],
        disabledOptions,
      },
    }
  } catch (error) {
    return {
      props: {
        cards,
        navigation,
        deck: [defaultCard, defaultCard],
        disabledOptions,
      },
    }
  }
}

const ValueCalculatorPage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['TOOLS', 'CALCULATORS', 'VALUE_CALCULATOR']}
    navigation={navigation}
  >
    <ValueCalculator {...props} />
  </Layout>
)

export default ValueCalculatorPage
