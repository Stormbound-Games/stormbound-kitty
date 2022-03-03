import React from 'react'
import FanKit from '~/components/FanKit'
import Layout from '~/components/Layout'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getCards from '~/api/cards/getCards'

const CARD_IDS = ['N23', 'N73', 'N22', 'N84', 'N21', 'N83']

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

const FanKitPage = ({ settings, cards, ...props }) => (
  <Layout active={['GAME', 'INFORMATION', 'FAN_KIT']} settings={settings}>
    <FanKit {...props} />
  </Layout>
)

export default FanKitPage
