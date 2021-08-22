import React from 'react'
import BrawlIndex from '~/components/BrawlIndex'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  return { props: { navigation: getNavigation() } }
}

const BrawlIndexPage = ({ navigation, ...props }) => (
  <Layout
    active={['TOOLS', 'YOUR_CONTENT', 'BRAWL_TRACKER']}
    navigation={navigation}
  >
    <BrawlIndex {...props} />
  </Layout>
)

export default BrawlIndexPage
