import React from 'react'
import CardBuilder from '~/components/CardBuilder'
import Layout from '~/components/Layout'
import getInitialCardData from '~/helpers/getInitialCardData'
import getSiteSettings from '~/api/misc/getSiteSettings'
import indexArray from '~/helpers/indexArray'
import getSWCCFromCard from '~/api/swcc/getSWCCFromCard'
import getSWCCWeeks from '~/api/swcc/getSWCCWeeks'

export async function getStaticPaths() {
  const weeks = await getSWCCWeeks()
  const paths = weeks
    .map(week => ({
      params: { rest: [week.winner.id, 'display'] },
    }))
    .concat({ params: { rest: [] } })

  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const settings = await getSiteSettings({ isPreview })
  const [cardId, display] = params.rest || []
  const isOfficial = cardId in indexArray(settings.cards)

  if (display && display !== 'display') {
    return { notFound: true }
  }

  if (isOfficial) {
    return {
      redirect: {
        destination: `/card/official/${cardId}`,
        permanent: true,
      },
    }
  }

  if (!cardId) {
    return { props: { settings, mode: 'EDITOR' } }
  }

  const card = getInitialCardData(settings.cards, cardId)
  const contest = await getSWCCFromCard({ id: cardId, isPreview })
  const mode = display === 'display' ? 'DISPLAY' : 'EDITOR'

  return { props: { settings, cardId, card, contest, mode } }
}

const CardBuilderPage = ({ settings, ...props }) => (
  <Layout active={['TOOLS', 'BUILDERS', 'CARD_BUILDER']} settings={settings}>
    <CardBuilder {...props} />
  </Layout>
)

export default CardBuilderPage
