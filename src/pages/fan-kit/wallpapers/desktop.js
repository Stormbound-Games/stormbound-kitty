import React from 'react'
import FanKitWallpapersDesktop from '~/components/FanKitWallpapersDesktop'
import Layout from '~/components/Layout'
import getWallpapersFromType from '~/api/wallpapers/getWallpapersFromType'
import getNavigation from '~/helpers/getNavigation'
import getCards from '~/api/cards/getCards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const navigation = await getNavigation({ isPreview })
  const wallpapers = await getWallpapersFromType({ type: 'DESKTOP', isPreview })

  return {
    props: { cards, navigation, wallpapers },
    revalidate: 60 * 60 * 24 * 7,
  }
}

const FanKitWallpapersPage = ({ navigation, cards, ...props }) => (
  <Layout active={['GAME', 'INFORMATION', 'FAN_KIT']} navigation={navigation}>
    <FanKitWallpapersDesktop {...props} />
  </Layout>
)

export default FanKitWallpapersPage
