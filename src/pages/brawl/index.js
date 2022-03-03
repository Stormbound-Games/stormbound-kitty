import React from 'react'
import BrawlIndex from '~/components/BrawlIndex'
import Layout from '~/components/Layout'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getCards from '~/api/cards/getCards'
import { BRAWLS } from '~/constants/brawl'

const CARD_IDS = BRAWLS.map(brawl => brawl.cardId)

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const settings = await getSiteSettings({ isPreview })

  return {
    props: {
      cards: cards.filter(card => CARD_IDS.includes(card.id)),
      settings,
    },
  }
}

const BrawlIndexPage = ({ settings, cards, ...props }) => (
  <Layout
    active={['YOUR_CONTENT', 'YOUR_CONTENT', 'BRAWL_TRACKER']}
    settings={settings}
  >
    <BrawlIndex {...props} />
  </Layout>
)

export default BrawlIndexPage
