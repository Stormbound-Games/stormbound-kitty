import React from 'react'
import OfficialCardPage from '~/components/OfficialCardPage'
import CardBuilder from '~/components/CardBuilder'
import Layout from '~/components/Layout'
import getInitialCardData from '~/helpers/getInitialCardData'
import getSiteSettings from '~/api/misc/getSiteSettings'
import indexArray from '~/helpers/indexArray'
import getSWCCFromCard from '~/api/swcc/getSWCCFromCard'
import getChangesFromCard from '~/api/changes/getChangesFromCard'
import getChanges from '~/api/changes/getChanges'
import getCards from '~/api/cards/getCards'

export async function getStaticPaths() {
  const cards = (await getCards()).filter(card => !card.token)
  const changes = await getChanges()
  const paths = cards
    .flatMap(card =>
      changes
        .filter(change => change.id === card.id)
        .map(change => ({
          params: { rest: [change.id, 'display', String(change.timestamp)] },
        }))
        .concat({
          params: { rest: [card.id, 'display'] },
        })
    )
    .concat([{ params: { rest: [] } }])

  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const [cardId, display, versionId = null] = params.rest || []
  const isOfficial = cardId in indexArray(settings.cards)

  if (
    // Invalid view keyword
    (display && display !== 'display') ||
    // Version ID with a non-official card
    (versionId && !isOfficial)
  ) {
    return { notFound: true }
  }

  if (!cardId) {
    return { props: { settings, mode: 'EDITOR' } }
  }

  const card = getInitialCardData(settings.cards, cardId)

  if (isOfficial) {
    const versions = await getChangesFromCard({ id: cardId, isPreview })

    if (
      // Invalid version ID
      versionId &&
      !versions.some(v => String(v.timestamp) === versionId)
    ) {
      return { notFound: true }
    }

    return {
      props: { settings, isOfficial, cardId, card, versionId, versions },
    }
  }

  const contest = await getSWCCFromCard({ id: cardId, isPreview })
  const mode = display === 'display' ? 'DISPLAY' : 'EDITOR'

  return { props: { settings, cardId, card, contest, mode } }
}

const CardBuilderPage = ({ settings, isOfficial, ...props }) => {
  const Component = isOfficial ? OfficialCardPage : CardBuilder
  const active = isOfficial
    ? ['GAME', 'INFORMATION', 'CARDS']
    : ['TOOLS', 'BUILDERS', 'CARD_BUILDER']

  return (
    <Layout active={active} settings={settings}>
      <Component {...props} />
    </Layout>
  )
}

export default CardBuilderPage
