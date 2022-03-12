import React from 'react'
import KnownBugs from '~/components/KnownBugs'
import Layout from '~/components/Layout'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })

  return { props: { settings } }
}

const KnownBugsPage = ({ settings, ...props }) => (
  <Layout active={['GAME', 'INFORMATION', 'KNOWN_BUGS']} settings={settings}>
    <KnownBugs {...props} />
  </Layout>
)

export default KnownBugsPage
