import React from 'react'
import BrewedSages from '~/components/BrewedSages'
import Layout from '~/components/Layout'
import PODCASTS from '~/data/podcasts'

export async function getStaticProps() {
  return { props: { episodes: PODCASTS } }
}

const BrewedSagesPage = props => (
  <Layout active={['COMMUNITY', 'BREWED_SAGES']}>
    <BrewedSages episodes={props.episodes} />
  </Layout>
)

export default BrewedSagesPage
