import React from 'react'
import FanKitCards from '~/components/FanKitCards'
import Layout from '~/components/Layout'
import CARDS from '~/data/cards'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps({ preview: isPreview = false }) {
  return {
    props: { navigation: await getNavigation({ isPreview }), cards: CARDS },
  }
}

const FanKitCardsPage = ({ navigation, ...props }) => (
  <Layout active={['GAME', 'INFORMATION', 'FAN_KIT']} navigation={navigation}>
    <FanKitCards {...props} />
  </Layout>
)

export default FanKitCardsPage
