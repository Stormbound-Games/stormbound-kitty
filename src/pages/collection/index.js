import React from 'react'
import Collection from '~/components/Collection'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  return { props: { navigation: getNavigation() } }
}

const CollectionPage = props => (
  <Layout
    active={['TOOLS', 'YOUR_CONTENT', 'COLLECTION']}
    navigation={props.navigation}
  >
    <Collection />
  </Layout>
)

export default CollectionPage
