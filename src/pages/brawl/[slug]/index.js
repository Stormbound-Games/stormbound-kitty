import React from 'react'
import BrawlPage from '~/components/BrawlPage'
import Layout from '~/components/Layout'
import { BRAWLS, BRAWL_INDEX } from '~/constants/brawl'
import GUIDES from '~/data/guides'
import DECKS from '~/data/decks'
import parseDate from '~/helpers/parseDate'
import getNavigation from '~/helpers/getNavigation'

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
  const guide = GUIDES.find(guide => guide.name === brawl.title) || null
  const recommendedDeck = DECKS.find(deck => deck.tags.includes(id)) || null

  if (!brawl) {
    return { notFound: true }
  }

  return {
    props: { navigation: getNavigation(), id, brawl, guide, recommendedDeck },
  }
}

const BrawlTrackerPage = props => (
  <Layout
    active={['TOOLS', 'YOUR_CONTENT', 'BRAWL_TRACKER']}
    navigation={props.navigation}
  >
    <BrawlPage {...props} />
  </Layout>
)

export default BrawlTrackerPage
