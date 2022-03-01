import React from 'react'
import RankedList from '~/components/RankedList'
import Layout from '~/components/Layout'
import getInitialListData from '~/helpers/getInitialListData'
import getLiveTierList from '~/helpers/getLiveTierList'
import getNavigation from '~/helpers/getNavigation'
import getCards from '~/api/cards/getCards'

export async function getStaticProps({ preview: isPreview = false }) {
  const tierList = await getLiveTierList({ isPreview })
  const cards = await getCards({ isPreview })
  const navigation = await getNavigation({ isPreview })
  const list = getInitialListData(tierList)

  return {
    props: {
      cards: cards.map(card => ({
        id: card.id,
        image: card.image,
        name: card.name,
      })),
      navigation,
      list,
    },
    revalidate: 60 * 60 * 24 * 7,
  }
}

const RankedListPage = ({ navigation, cards, ...props }) => (
  <Layout active={['COMMUNITY', 'META', 'RANKED_LIST']} navigation={navigation}>
    <RankedList {...props} />
  </Layout>
)

export default RankedListPage
