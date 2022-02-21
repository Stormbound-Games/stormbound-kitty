import React from 'react'
import RankedList from '~/components/RankedList'
import Layout from '~/components/Layout'
import getInitialListData from '~/helpers/getInitialListData'
import getLiveTierList from '~/helpers/getLiveTierList'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  const tierList = await getLiveTierList()

  return {
    props: {
      navigation: getNavigation(),
      list: getInitialListData(tierList),
    },
  }
}

const RankedListPage = ({ navigation, ...props }) => (
  <Layout active={['COMMUNITY', 'META', 'RANKED_LIST']} navigation={navigation}>
    <RankedList {...props} />
  </Layout>
)

export default RankedListPage
