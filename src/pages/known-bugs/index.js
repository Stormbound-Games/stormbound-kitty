import React from 'react'
import KnownBugs from '~/components/KnownBugs'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  return { props: { navigation: getNavigation() } }
}

const KnownBugsPage = ({ navigation, ...props }) => (
  <Layout
    active={['GAME', 'INFORMATION', 'KNOWN_BUGS']}
    navigation={navigation}
  >
    <KnownBugs {...props} />
  </Layout>
)

export default KnownBugsPage
