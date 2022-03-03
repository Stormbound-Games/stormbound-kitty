import React from 'react'
import DraftSimulator from '~/components/DraftSimulator'
import Layout from '~/components/Layout'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import serialization from '~/helpers/serialization'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getDeckAdvice from '~/helpers/getDeckAdvice'
import indexArray from '~/helpers/indexArray'
import getCards from '~/api/cards/getCards'

export async function getStaticPaths() {
  return { paths: [{ params: { id: null } }], fallback: 'blocking' }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const settings = await getSiteSettings({ isPreview })
  const [id] = params.id || []
  const cardsIndex = indexArray(cards)

  try {
    const deck = serialization.cards
      .deserialize(id)
      .map(card => getResolvedCardData(cardsIndex, card))
    const advice =
      cards.length === 12 ? await getDeckAdvice(cardsIndex, deck) : []

    return { props: { cards, settings, deck, advice } }
  } catch (error) {
    return { props: { cards, settings, deck: [], advice: [] } }
  }
}

const DraftSimulatorPage = ({ settings, cards, ...props }) => (
  <Layout
    active={['TOOLS', 'SIMULATORS', 'DRAFT_SIMULATOR']}
    settings={settings}
  >
    <DraftSimulator {...props} />
  </Layout>
)

export default DraftSimulatorPage
