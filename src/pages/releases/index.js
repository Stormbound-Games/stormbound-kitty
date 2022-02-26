import React from 'react'
import Releases from '~/components/Releases'
import Layout from '~/components/Layout'
import getReleases from '~/api/releases/getReleases'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps({ preview: isPreview = false }) {
  return {
    props: {
      navigation: await getNavigation({ isPreview }),
      releases: await getReleases({ isPreview }),
    },
  }
}

const ReleasesPage = ({ navigation, ...props }) => (
  <Layout active={['GAME', 'UPDATES', 'RELEASES']} navigation={navigation}>
    <Releases {...props} />
  </Layout>
)

export default ReleasesPage
