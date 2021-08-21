import React from 'react'
import RankedList from '~/components/RankedList'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  return { props: { navigation: getNavigation() } }
}

const RankedListPage = props => (
  <Layout
    active={['COMMUNITY', 'META', 'RANKED_LIST']}
    navigation={props.navigation}
  >
    <RankedList />
  </Layout>
)

export default RankedListPage
