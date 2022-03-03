import React from 'react'
import FanKitCards from '~/components/FanKitCards'
import Layout from '~/components/Layout'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getCards from '~/api/cards/getCards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const settings = await getSiteSettings({ isPreview })

  return {
    props: {
      cards: cards.map(card => ({
        id: card.id,
        name: card.name,
        image: card.image,
        faction: card.faction,
        rarity: card.rarity,
      })),
      settings,
    },
  }
}

const FanKitCardsPage = ({ settings, cards, ...props }) => (
  <Layout active={['GAME', 'INFORMATION', 'FAN_KIT']} settings={settings}>
    <FanKitCards {...props} cards={cards} />
  </Layout>
)

export default FanKitCardsPage
