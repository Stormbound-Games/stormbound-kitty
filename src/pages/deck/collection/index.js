import React from 'react'
import DeckCollection from '~/components/DeckCollection'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  return { props: { navigation: getNavigation() } }
}

const DeckCollectionPage = props => (
  <Layout
    active={['TOOLS', 'YOUR_CONTENT', 'DECK_COLLECTION']}
    navigation={props.navigation}
  >
    <DeckCollection />
  </Layout>
)

export default DeckCollectionPage
