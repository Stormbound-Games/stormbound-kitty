import React from 'react'
import path from 'path'
import ValueCalculator from '~/components/ValueCalculator'
import Layout from '~/components/Layout'
import getCardValue from '~/helpers/getCardValue'
import generateFormulaImage from '~/helpers/generateFormulaImage'
import getNavigation from '~/helpers/getNavigation'
import serialisation from '~/helpers/serialisation'
import CARDS from '~/data/cards'

export async function getStaticPaths() {
  const formula = `v(c) = s / m * f`
  const filePath = path.resolve('./public/assets/images/formulas/value.png')

  await generateFormulaImage(formula, filePath)

  return { paths: [{ params: { id: null } }], fallback: 'blocking' }
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

const ValueCalculatorPage = ({ navigation, ...props }) => (
  <Layout
    active={['TOOLS', 'CALCULATORS', 'VALUE_CALCULATOR']}
    navigation={navigation}
  >
    <ValueCalculator {...props} />
  </Layout>
)

export default ValueCalculatorPage
