import React from 'react'
import FanKitWallpapers from '~/components/FanKitWallpapers'
import Layout from '~/components/Layout'
import getWallpapers from '~/api/wallpapers/getWallpapers'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps({ preview: isPreview = false }) {
  return {
    props: {
      navigation: await getNavigation({ isPreview }),
      wallpapers: await getWallpapers({ isPreview }),
    },
  }
}

const FanKitWallpapersPage = ({ navigation, ...props }) => (
  <Layout active={['GAME', 'INFORMATION', 'FAN_KIT']} navigation={navigation}>
    <FanKitWallpapers {...props} />
  </Layout>
)

export default FanKitWallpapersPage
