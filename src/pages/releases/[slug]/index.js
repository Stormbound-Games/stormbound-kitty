import React from 'react'
import BlocksRenderer from '~/components/BlocksRenderer'
import Layout from '~/components/Layout'
import ReleaseNotes from '~/components/ReleaseNotes'
import getNavigation from '~/helpers/getNavigation'
import getRelease from '~/api/releases/getRelease'
import getReleases from '~/api/releases/getReleases'

export async function getStaticPaths() {
  const releases = await getReleases()

  return {
    paths: releases.map(release => ({ params: { slug: release.slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const release = await getRelease({ slug: params.slug, isPreview })

  return {
    props: {
      navigation: await getNavigation({ isPreview }),
      ...release,
    },
  }
}

const ReleasePage = ({ navigation, ...props }) => (
  <Layout active={['GAME', 'UPDATES', props.id]} navigation={navigation}>
    <ReleaseNotes {...props}>
      <BlocksRenderer value={props.content} />
    </ReleaseNotes>
  </Layout>
)

export default ReleasePage
