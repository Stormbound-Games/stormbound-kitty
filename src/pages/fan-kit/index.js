import React from 'react'
import FanKit from '~/components/FanKit'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  return { props: { navigation: getNavigation() } }
}

const FanKitPage = props => (
  <Layout
    active={['GAME', 'INFORMATION', 'FAN_KIT']}
    navigation={props.navigation}
  >
    <FanKit />
  </Layout>
)

export default FanKitPage
