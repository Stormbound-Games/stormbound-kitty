import React from 'react'
import EqualsList from '~/components/EqualsList'
import Layout from '~/components/Layout'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getEqualTierList from '~/api/misc/getEqualTierList'
import getCards from '~/api/cards/getCards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const settings = await getSiteSettings({ isPreview })
  const equalTierList = await getEqualTierList({ isPreview })

  return {
    props: {
      cards: cards.map(card => ({
        id: card.id,
        image: card.image,
        name: card.name,
      })),
      settings,
      date: equalTierList.date,
      list: equalTierList.tiers,
    },
  }
}

const EqualsListPage = ({ settings, cards, ...props }) => (
  <Layout active={['COMMUNITY', 'META', 'EQUALS_LIST']} settings={settings}>
    <EqualsList {...props} />
  </Layout>
)

export default EqualsListPage
