import React from 'react'
import BrewedSages from '~/components/BrewedSages'
import Layout from '~/components/Layout'
import getPodcasts from '~/api/podcasts/getPodcasts'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const episodes = await getPodcasts({ isPreview })

  return {
    props: { settings, episodes },
    revalidate: 60 * 60 * 24 * 7,
  }
}

const BrewedSagesPage = ({ settings, ...props }) => (
  <Layout
    active={['COMMUNITY', 'DISCOVER', 'BREWED_SAGES']}
    settings={settings}
  >
    <BrewedSages {...props} />
  </Layout>
)

export default BrewedSagesPage
