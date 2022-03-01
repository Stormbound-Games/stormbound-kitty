import React from 'react'
import FanKit from '~/components/FanKit'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'
import getCards from '~/api/cards/getCards'

const CARD_IDS = ['N23', 'N73', 'N22', 'N84', 'N21', 'N83']

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

const FanKitPage = ({ navigation, cards, ...props }) => (
  <Layout active={['GAME', 'INFORMATION', 'FAN_KIT']} navigation={navigation}>
    <FanKit {...props} />
  </Layout>
)

export default FanKitPage
