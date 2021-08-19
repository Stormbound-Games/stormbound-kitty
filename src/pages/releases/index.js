import React from 'react'
import Releases from '~/components/Releases'
import Layout from '~/components/Layout'
import RELEASES from '~/data/releases'

export async function getStaticProps() {
  return { props: { releases: RELEASES } }
}

const ReleasesPage = props => (
  <Layout active={['GAME', 'RELEASES']}>
    <Releases releases={props.releases} />
  </Layout>
)

export default ReleasesPage
