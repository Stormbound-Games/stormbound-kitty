import React from 'react'
import EqualsList from '~/components/EqualsList'
import Layout from '~/components/Layout'
import getInitialListData from '~/helpers/getInitialListData'
import getNavigation from '~/helpers/getNavigation'
import getRelease from '~/api/releases/getRelease'
import { EQUALS_TIER_LIST } from '~/constants/list'
import getCards from '~/api/cards/getCards'

export async function getStaticProps({ preview: isPreview = false }) {
  const [month, year] = EQUALS_TIER_LIST.date.split('/')
  const rel = await getRelease({ date: year + '-' + month + '-01' })
  const cards = await getCards({ isPreview })
  const navigation = await getNavigation({ isPreview })
  const date = EQUALS_TIER_LIST.date
  const list = getInitialListData(EQUALS_TIER_LIST.value)
  const release = rel ? { title: rel.title, slug: rel.slug } : null

  return {
    props: {
      cards: cards.map(card => ({
        id: card.id,
        image: card.image,
        name: card.name,
      })),
      navigation,
      date,
      list,
      release,
    },
  }
}

const EqualsListPage = ({ navigation, cards, ...props }) => (
  <Layout active={['COMMUNITY', 'META', 'EQUALS_LIST']} navigation={navigation}>
    <EqualsList {...props} />
  </Layout>
)

export default EqualsListPage
