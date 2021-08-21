import React from 'react'
import FanKitBooks from '~/components/FanKitBooks'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  return { props: { navigation: getNavigation() } }
}

const FanKitBooksPage = props => (
  <Layout
    active={['GAME', 'INFORMATION', 'FAN_KIT']}
    navigation={props.navigation}
  >
    <FanKitBooks />
  </Layout>
)

export default FanKitBooksPage
