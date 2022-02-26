import React from 'react'
import DraftSimulator from '~/components/DraftSimulator'
import Layout from '~/components/Layout'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import serialization from '~/helpers/serialization'
import getNavigation from '~/helpers/getNavigation'
import getDeckAdvice from '~/helpers/getDeckAdvice'
import CARDS from '~/data/cards'

export async function getStaticPaths() {
  return { paths: [{ params: { id: null } }], fallback: 'blocking' }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const navigation = await getNavigation({ isPreview })
  const [id] = params.id || []

  try {
    const cards = serialization.cards.deserialize(id).map(getResolvedCardData)
    const advice = cards.length === 12 ? await getDeckAdvice(cards) : []

    return { props: { allCards: CARDS, navigation, cards, advice } }
  } catch (error) {
    return { props: { allCards: CARDS, navigation, cards: [], advice: [] } }
  }
}

const DraftSimulatorPage = ({ navigation, allCards, ...props }) => (
  <Layout
    active={['TOOLS', 'SIMULATORS', 'DRAFT_SIMULATOR']}
    navigation={navigation}
    cards={allCards}
  >
    <DraftSimulator {...props} />
  </Layout>
)

export default DraftSimulatorPage
