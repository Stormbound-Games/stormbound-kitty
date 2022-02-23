import React from 'react'
import FanKitWallpapersDesktop from '~/components/FanKitWallpapersDesktop'
import Layout from '~/components/Layout'
import getWallpapersFromType from '~/api/wallpapers/getWallpapersFromType'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps({ preview: isPreview = false }) {
  return {
    props: {
      navigation: await getNavigation({ isPreview }),
      wallpapers: await getWallpapersFromType({ type: 'DESKTOP', isPreview }),
    },
  }
}

const FanKitWallpapersPage = ({ navigation, ...props }) => (
  <Layout active={['GAME', 'INFORMATION', 'FAN_KIT']} navigation={navigation}>
    <FanKitWallpapersDesktop {...props} />
  </Layout>
)

export default FanKitWallpapersPage
