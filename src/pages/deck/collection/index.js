import React from 'react'
import DeckCollection from '~/components/DeckCollection'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps({ preview: isPreview = false }) {
  return { props: { navigation: await getNavigation({ isPreview }) } }
}

const DeckCollectionPage = ({ navigation, ...props }) => (
  <Layout
    active={['YOUR_CONTENT', 'YOUR_CONTENT', 'DECK_COLLECTION']}
    navigation={navigation}
  >
    <DeckCollection {...props} />
  </Layout>
)

export default DeckCollectionPage
