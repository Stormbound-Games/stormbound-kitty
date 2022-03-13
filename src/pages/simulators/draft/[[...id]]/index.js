import React from 'react'
import DraftSimulator from '~/components/DraftSimulator'
import Layout from '~/components/Layout'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import serialization from '~/helpers/serialization'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getDeckAdvice from '~/helpers/getDeckAdvice'
import indexArray from '~/helpers/indexArray'

export async function getStaticPaths() {
  return { paths: [{ params: { id: null } }], fallback: 'blocking' }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const [id] = params.id || []
  const cardsIndex = indexArray(settings.cards)
  const deck = id ? serialization.cards.deserialize(id) : []

  if (deck.some(card => !(card.id in cardsIndex))) {
    return { notFound: true }
  }

  const advice = deck.length === 12 ? await getDeckAdvice(cardsIndex, deck) : []

  return {
    props: {
      settings,
      deck: deck.map(card => getResolvedCardData(cardsIndex, card)),
      advice,
    },
  }
}

const DraftSimulatorPage = ({ settings, ...props }) => (
  <Layout
    active={['TOOLS', 'SIMULATORS', 'DRAFT_SIMULATOR']}
    settings={settings}
  >
    <DraftSimulator {...props} />
  </Layout>
)

export default DraftSimulatorPage
