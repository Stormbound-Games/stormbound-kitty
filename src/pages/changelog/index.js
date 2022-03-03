import React from 'react'
import CardChangelog from '~/components/CardChangelog'
import Layout from '~/components/Layout'
import getChanges from '~/api/changes/getChanges'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getCards from '~/api/cards/getCards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const changelog = await getChanges({ isPreview })
  const settings = await getSiteSettings({ isPreview })

  return { props: { cards, changelog, settings } }
}

const CardChangelogPage = ({ settings, cards, ...props }) => (
  <Layout active={['GAME', 'UPDATES', 'CARD_CHANGELOG']} settings={settings}>
    <CardChangelog {...props} />
  </Layout>
)

export default CardChangelogPage
