import React from 'react'
import OfficialCardPage from '~/components/OfficialCardPage'
import Layout from '~/components/Layout'
import getInitialCardData from '~/helpers/getInitialCardData'
import getSiteSettings from '~/api/misc/getSiteSettings'
import indexArray from '~/helpers/indexArray'
import getChangesFromCard from '~/api/changes/getChangesFromCard'
import getChanges from '~/api/changes/getChanges'
import getCardFeed from '~/api/cards/getCardFeed'

export async function getStaticPaths() {
  const changes = await getChanges()
  const paths = changes.map(change => ({
    params: { id: change.id, version: String(change.timestamp) },
  }))

  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const { id: cardId, version: versionId } = params
  const isOfficial = cardId in indexArray(settings.cards)

  if (!isOfficial) {
    return { notFound: true }
  }

  const card = getInitialCardData(settings.cards, cardId)
  const versions = await getChangesFromCard({ id: cardId, isPreview })

  if (!versions.some(v => String(v.timestamp) === versionId)) {
    return { notFound: true }
  }

  const feed = await getCardFeed({ id: cardId, isPreview })

  return {
    props: { settings, cardId, card, versionId, versions, feed },
  }
}

const CardBuilderPage = ({ settings, ...props }) => (
  <Layout active={['GAME', 'INFORMATION', 'CARDS']} settings={settings}>
    <OfficialCardPage {...props} />
  </Layout>
)

export default CardBuilderPage
