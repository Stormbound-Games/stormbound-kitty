import React from 'react'
import FanKitWallpapersMobile from '~/components/FanKitWallpapersMobile'
import Layout from '~/components/Layout'
import getWallpapersFromType from '~/api/wallpapers/getWallpapersFromType'
import getNavigation from '~/helpers/getNavigation'
import CARDS from '~/data/cards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = CARDS
  const navigation = await getNavigation({ isPreview })
  const wallpapers = await getWallpapersFromType({ type: 'MOBILE', isPreview })

  return {
    props: { cards, navigation, wallpapers },
    revalidate: 60 * 60 * 24 * 7,
  }
}

const FanKitWallpapersPage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['GAME', 'INFORMATION', 'FAN_KIT']}
    navigation={navigation}
    cards={cards}
  >
    <FanKitWallpapersMobile {...props} />
  </Layout>
)

export default FanKitWallpapersPage
