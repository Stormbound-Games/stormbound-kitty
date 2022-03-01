import React from 'react'
import BrewedSages from '~/components/BrewedSages'
import Layout from '~/components/Layout'
import getPodcasts from '~/api/podcasts/getPodcasts'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps({ preview: isPreview = false }) {
  const navigation = await getNavigation({ isPreview })
  const episodes = await getPodcasts({ isPreview })

  return {
    props: { navigation, episodes },
    revalidate: 60 * 60 * 24 * 7,
  }
}

const BrewedSagesPage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['COMMUNITY', 'DISCOVER', 'BREWED_SAGES']}
    navigation={navigation}
  >
    <BrewedSages {...props} />
  </Layout>
)

export default BrewedSagesPage
