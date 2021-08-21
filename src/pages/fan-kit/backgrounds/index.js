import React from 'react'
import FanKitBackgrounds from '~/components/FanKitBackgrounds'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  return { props: { navigation: getNavigation() } }
}

const FanKitBackgroundsPage = props => (
  <Layout
    active={['GAME', 'INFORMATION', 'FAN_KIT']}
    navigation={props.navigation}
  >
    <FanKitBackgrounds />
  </Layout>
)

export default FanKitBackgroundsPage
