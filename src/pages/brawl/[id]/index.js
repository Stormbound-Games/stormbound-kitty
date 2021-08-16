import React from 'react'
import BrawlPage from '~/components/BrawlPage'
import Layout from '~/components/Layout'
import { BRAWLS } from '~/constants/brawl'

export async function getStaticPaths() {
  const paths = BRAWLS.map(brawl => ({
    params: { id: brawl.id.replace(/_/g, '-').toLowerCase() },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps(context) {
  return { props: { id: context.params.id } }
}

const BrawlTrackerPage = props => (
  <Layout active={['TOOLS', 'BRAWL', 'TRACKER']}>
    <BrawlPage id={props.id} />
  </Layout>
)

export default BrawlTrackerPage
