import React from 'react'
import BlocksRenderer from '~/components/BlocksRenderer'
import Layout from '~/components/Layout'
import ReleaseNotes from '~/components/ReleaseNotes'
import getNavigation from '~/helpers/getNavigation'
import getRelease from '~/api/releases/getRelease'
import getReleases from '~/api/releases/getReleases'
import CARDS from '~/data/cards'

export async function getStaticPaths() {
  const releases = await getReleases()

  return {
    paths: releases.map(release => ({ params: { slug: release.slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const cards = CARDS
  const navigation = await getNavigation({ isPreview })
  const release = await getRelease({ slug: params.slug, isPreview })

  return { props: { cards, navigation, ...release } }
}

const ReleasePage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['GAME', 'UPDATES', props.id]}
    navigation={navigation}
    cards={cards}
  >
    <ReleaseNotes {...props}>
      <BlocksRenderer value={props.content} />
    </ReleaseNotes>
  </Layout>
)

export default ReleasePage
