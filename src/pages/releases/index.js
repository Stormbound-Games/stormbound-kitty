import React from 'react'
import Releases from '~/components/Releases'
import Layout from '~/components/Layout'
import getReleases from '~/api/releases/getReleases'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const releases = await getReleases({ isPreview })
  const cardIds = releases.map(release => release.cardId)

  return {
    props: {
      settings,
      releases,
    },
  }
}

const ReleasesPage = ({ settings, ...props }) => (
  <Layout active={['GAME', 'UPDATES', 'RELEASES']} settings={settings}>
    <Releases {...props} />
  </Layout>
)

export default ReleasesPage
