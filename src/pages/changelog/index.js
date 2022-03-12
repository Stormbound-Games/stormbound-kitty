import React from 'react'
import CardChangelog from '~/components/CardChangelog'
import Layout from '~/components/Layout'
import getChanges from '~/api/changes/getChanges'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const changelog = await getChanges({ isPreview })
  const settings = await getSiteSettings({ isPreview })

  return { props: { changelog, settings } }
}

const CardChangelogPage = ({ settings, ...props }) => (
  <Layout active={['GAME', 'UPDATES', 'CARD_CHANGELOG']} settings={settings}>
    <CardChangelog {...props} />
  </Layout>
)

export default CardChangelogPage
