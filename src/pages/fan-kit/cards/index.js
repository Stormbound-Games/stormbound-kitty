import React from 'react'
import FanKitCards from '~/components/FanKitCards'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'
import getCards from '~/api/cards/getCards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const navigation = await getNavigation({ isPreview })

  return {
    props: {
      cards: cards.map(card => ({
        id: card.id,
        name: card.name,
        image: card.image,
      })),
      navigation,
    },
  }
}

const FanKitCardsPage = ({ navigation, cards, ...props }) => (
  <Layout active={['GAME', 'INFORMATION', 'FAN_KIT']} navigation={navigation}>
    <FanKitCards {...props} cards={cards} />
  </Layout>
)

export default FanKitCardsPage
