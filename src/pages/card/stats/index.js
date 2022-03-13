import React from 'react'
import CardsStats from '~/components/CardsStats'
import Layout from '~/components/Layout'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })

  return { props: { settings } }
}

const CardStatsPage = ({ settings, ...props }) => (
  <Layout active={['GAME', 'INFORMATION', 'CARD_STATS']} settings={settings}>
    <CardsStats {...props} />
  </Layout>
)

export default CardStatsPage
