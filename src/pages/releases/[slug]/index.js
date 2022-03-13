import React from 'react'
import BlocksRenderer from '~/components/BlocksRenderer'
import Layout from '~/components/Layout'
import ReleaseNotes from '~/components/ReleaseNotes'
import getSiteSettings from '~/api/misc/getSiteSettings'
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
  const settings = await getSiteSettings({ isPreview })
  const release = await getRelease({ slug: params.slug, isPreview })

  return { props: { settings, ...release } }
}

const ReleasePage = ({ settings, ...props }) => (
  <Layout active={['GAME', 'UPDATES', props.id]} settings={settings}>
    <ReleaseNotes {...props}>
      <BlocksRenderer value={props.content} />
    </ReleaseNotes>
  </Layout>
)

export default ReleasePage
