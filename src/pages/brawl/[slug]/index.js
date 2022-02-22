import React from 'react'
import BrawlPage from '~/components/BrawlPage'
import Layout from '~/components/Layout'
import { BRAWLS, BRAWL_INDEX } from '~/constants/brawl'
import getGuide from '~/api/guides/getGuide'
import getDecksWithTag from '~/api/decks/getDecksWithTag'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticPaths() {
  const paths = BRAWLS.map(brawl => ({
    params: { slug: brawl.id.replace(/_/g, '-').toLowerCase() },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps(context) {
  const { slug } = context.params
  const isPreview = context.preview || false
  const id = slug.toUpperCase().replace(/-/g, '_')
  const brawl = BRAWL_INDEX[id]
  const guide = await getGuide({ name: brawl.title, isPreview })
  const recommendedDecks = await getDecksWithTag({ tag: id, isPreview })
  const recommendedDeck = recommendedDecks[0] || null

  if (!brawl) {
    return { notFound: true }
  }

  return {
    props: { navigation: getNavigation(), id, brawl, guide, recommendedDeck },
  }
}

const BrawlTrackerPage = ({ navigation, ...props }) => (
  <Layout
    active={['TOOLS', 'YOUR_CONTENT', 'BRAWL_TRACKER']}
    navigation={navigation}
  >
    <BrawlPage {...props} />
  </Layout>
)

export default BrawlTrackerPage
