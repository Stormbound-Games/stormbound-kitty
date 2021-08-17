import React from 'react'
import BrawlPage from '~/components/BrawlPage'
import Layout from '~/components/Layout'
import { BRAWLS, BRAWL_INDEX } from '~/constants/brawl'

export async function getStaticPaths() {
  const paths = BRAWLS.map(brawl => ({
    params: { slug: brawl.id.replace(/_/g, '-').toLowerCase() },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps(context) {
  const { slug } = context.params
  const id = slug.toUpperCase().replace(/-/g, '_')
  const brawl = BRAWL_INDEX[id]

  if (!brawl) {
    return { notFound: true }
  }

  return { props: { id, brawl } }
}

const BrawlTrackerPage = props => (
  <Layout active={['TOOLS', 'BRAWL', 'TRACKER']}>
    <BrawlPage id={props.id} brawl={props.brawl} />
  </Layout>
)

export default BrawlTrackerPage
