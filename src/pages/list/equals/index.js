import React from 'react'
import EqualsList from '~/components/EqualsList'
import Layout from '~/components/Layout'
import RELEASES from '~/data/releases'
import getInitialListData from '~/helpers/getInitialListData'
import getNavigation from '~/helpers/getNavigation'
import { EQUALS_TIER_LIST } from '~/constants/list'

export async function getStaticProps({ preview: isPreview = false }) {
  return {
    props: {
      navigation: await getNavigation({ isPreview }),
      date: EQUALS_TIER_LIST.date,
      list: getInitialListData(EQUALS_TIER_LIST.value),
      release:
        RELEASES.find(release => release.date === EQUALS_TIER_LIST.date) ||
        null,
    },
  }
}

const EqualsListPage = ({ navigation, ...props }) => (
  <Layout active={['COMMUNITY', 'META', 'EQUALS_LIST']} navigation={navigation}>
    <EqualsList {...props} />
  </Layout>
)

export default EqualsListPage
