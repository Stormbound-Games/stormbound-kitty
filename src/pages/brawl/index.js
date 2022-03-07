import React from 'react'
import BrawlIndex from '~/components/BrawlIndex'
import Layout from '~/components/Layout'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getBrawls from '~/api/brawls/getBrawls'
import getCards from '~/api/cards/getCards'

export async function getStaticProps({ preview: isPreview = false }) {
  const brawls = await getBrawls({ isPreview })
  const cardIds = brawls.map(brawl => brawl.cardId)
  const cards = await getCards({ isPreview })
  const settings = await getSiteSettings({ isPreview })

  return {
    props: {
      brawls,
      cards: cards.filter(card => cardIds.includes(card.id)),
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
