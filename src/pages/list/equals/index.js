import React from 'react'
import EqualsList from '~/components/EqualsList'
import Layout from '~/components/Layout'
import getInitialListData from '~/helpers/getInitialListData'
import getNavigation from '~/helpers/getNavigation'
import getRelease from '~/api/releases/getRelease'
import { EQUALS_TIER_LIST } from '~/constants/list'

export async function getStaticProps({ preview: isPreview = false }) {
  const [month, year] = EQUALS_TIER_LIST.date.split('/')
  const release = await getRelease({ date: year + '-' + month + '-01' })

  return {
    props: {
      navigation: await getNavigation({ isPreview }),
      date: EQUALS_TIER_LIST.date,
      list: getInitialListData(EQUALS_TIER_LIST.value),
      release,
    },
  }
}

const EqualsListPage = ({ navigation, ...props }) => (
  <Layout active={['COMMUNITY', 'META', 'EQUALS_LIST']} navigation={navigation}>
    <EqualsList {...props} />
  </Layout>
)

export default EqualsListPage
