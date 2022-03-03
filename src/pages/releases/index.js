import React from 'react'
import Releases from '~/components/Releases'
import Layout from '~/components/Layout'
import getReleases from '~/api/releases/getReleases'
import getSiteSettings from '~/api/misc/getSiteSettings'
import getCards from '~/api/cards/getCards'

export async function getStaticProps({ preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const settings = await getSiteSettings({ isPreview })
  const releases = await getReleases({ isPreview })
  const cardIds = releases.map(release => release.cardId)

  return {
    props: {
      cards: cards.filter(card => cardIds.includes(card.id)),
      settings,
      releases,
    },
  }
}

const ReleasesPage = ({ settings, cards, ...props }) => (
  <Layout active={['GAME', 'UPDATES', 'RELEASES']} settings={settings}>
    <Releases {...props} />
  </Layout>
)

export default ReleasesPage
