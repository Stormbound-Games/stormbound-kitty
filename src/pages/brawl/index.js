import React from 'react'
import BrawlIndex from '~/components/BrawlIndex'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'
import getCards from '~/api/cards/getCards'
import { BRAWLS } from '~/constants/brawl'

const CARD_IDS = BRAWLS.map(brawl => brawl.cardId)

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const navigation = await getNavigation({ isPreview })

  return {
    props: {
      cards: cards.filter(card => CARD_IDS.includes(card.id)),
      navigation,
    },
  }
}

const BrawlIndexPage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['YOUR_CONTENT', 'YOUR_CONTENT', 'BRAWL_TRACKER']}
    navigation={navigation}
  >
    <BrawlIndex {...props} />
  </Layout>
)

export default BrawlIndexPage
