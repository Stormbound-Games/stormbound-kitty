import React from 'react'
import FanKitWallpapers from '~/components/FanKitWallpapers'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  return { props: { navigation: getNavigation() } }
}

const FanKitWallpapersPage = ({ navigation, ...props }) => (
  <Layout active={['GAME', 'INFORMATION', 'FAN_KIT']} navigation={navigation}>
    <FanKitWallpapers {...props} />
  </Layout>
)

export default FanKitWallpapersPage
