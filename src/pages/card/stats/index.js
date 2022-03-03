import React from 'react'
import CardsStats from '~/components/CardsStats'
import Layout from '~/components/Layout'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getCards from '~/api/cards/getCards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const settings = await getSiteSettings({ isPreview })

  return {
    props: { cards, settings },
  }
}

const CardStatsPage = ({ settings, cards, ...props }) => (
  <Layout active={['GAME', 'INFORMATION', 'CARD_STATS']} settings={settings}>
    <CardsStats {...props} cards={cards} />
  </Layout>
)

export default CardStatsPage
