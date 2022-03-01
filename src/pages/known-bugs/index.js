import React from 'react'
import KnownBugs from '~/components/KnownBugs'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps({ preview: isPreview = false }) {
  const navigation = await getNavigation({ isPreview })

  return { props: { navigation } }
}

const KnownBugsPage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['GAME', 'INFORMATION', 'KNOWN_BUGS']}
    navigation={navigation}
  >
    <KnownBugs {...props} />
  </Layout>
)

export default KnownBugsPage
