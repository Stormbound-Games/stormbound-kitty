import React from 'react'
import Collection from '~/components/Collection'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps({ preview: isPreview = false }) {
  return { props: { navigation: await getNavigation({ isPreview }) } }
}

const CollectionPage = ({ navigation, ...props }) => (
  <Layout
    active={['YOUR_CONTENT', 'YOUR_CONTENT', 'COLLECTION']}
    navigation={navigation}
  >
    <Collection {...props} />
  </Layout>
)

export default CollectionPage
