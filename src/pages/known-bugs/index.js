import React from 'react'
import KnownBugs from '~/components/KnownBugs'
import Layout from '~/components/Layout'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticProps() {
  return { props: { navigation: getNavigation() } }
}

const KnownBugsPage = props => (
  <Layout
    active={['GAME', 'INFORMATION', 'KNOWN_BUGS']}
    navigation={props.navigation}
  >
    <KnownBugs />
  </Layout>
)

export default KnownBugsPage
