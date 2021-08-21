import React from 'react'
import BrawlIndex from '~/components/BrawlIndex'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  return { props: { navigation: getNavigation() } }
}

const BrawlIndexPage = props => (
  <Layout
    active={['TOOLS', 'YOUR_CONTENT', 'BRAWL_TRACKER']}
    navigation={props.navigation}
  >
    <BrawlIndex />
  </Layout>
)

export default BrawlIndexPage
