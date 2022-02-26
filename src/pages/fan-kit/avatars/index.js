import React from 'react'
import FanKitAvatars from '~/components/FanKitAvatars'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'
import getAvatars from '~/api/avatars/getAvatars'
import CARDS from '~/data/cards'

export async function getStaticProps({ preview: isPreview = false }) {
  const avatars = await getAvatars({ isPreview })
  const cards = CARDS
  const navigation = await getNavigation({ isPreview })

  return {
    props: { avatars, cards, navigation },
    revalidate: 60 * 60 * 24 * 7,
  }
}

const FanKitAvatarsPage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['GAME', 'INFORMATION', 'FAN_KIT']}
    navigation={navigation}
    cards={cards}
  >
    <FanKitAvatars {...props} />
  </Layout>
)

export default FanKitAvatarsPage
