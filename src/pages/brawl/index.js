import React from 'react'
import BrawlIndex from '~/components/BrawlIndex'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps({ preview: isPreview = false }) {
  return { props: { navigation: await getNavigation({ isPreview }) } }
}

const BrawlIndexPage = ({ navigation, ...props }) => (
  <Layout
    active={['YOUR_CONTENT', 'YOUR_CONTENT', 'BRAWL_TRACKER']}
    navigation={navigation}
  >
    <BrawlIndex {...props} />
  </Layout>
)

export default BrawlIndexPage
