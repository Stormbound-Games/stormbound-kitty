import React from 'react'
import FanKitWallpapers from '~/components/FanKitWallpapers'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  return { props: { navigation: getNavigation() } }
}

const FanKitWallpapersPage = props => (
  <Layout
    active={['GAME', 'INFORMATION', 'FAN_KIT']}
    navigation={props.navigation}
  >
    <FanKitWallpapers />
  </Layout>
)

export default FanKitWallpapersPage
