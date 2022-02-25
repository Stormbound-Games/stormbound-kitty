import React from 'react'
import FanKitWallpapersMobile from '~/components/FanKitWallpapersMobile'
import Layout from '~/components/Layout'
import getWallpapersFromType from '~/api/wallpapers/getWallpapersFromType'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps({ preview: isPreview = false }) {
  return {
    props: {
      navigation: await getNavigation({ isPreview }),
      wallpapers: await getWallpapersFromType({ type: 'MOBILE', isPreview }),
    },
    revalidate: 60 * 60 * 24 * 7,
  }
}

const FanKitWallpapersPage = ({ navigation, ...props }) => (
  <Layout active={['GAME', 'INFORMATION', 'FAN_KIT']} navigation={navigation}>
    <FanKitWallpapersMobile {...props} />
  </Layout>
)

export default FanKitWallpapersPage
