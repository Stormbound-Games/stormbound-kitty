import React from 'react'
import CardBuilderEditor from '~/components/CardBuilderEditor'
import CardBuilderApp from '~/components/CardBuilderApp'
import Layout from '~/components/Layout'
import getInitialCardData from '~/helpers/getInitialCardData'
import getNavigation from '~/helpers/getNavigation'
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
  const cards = await getCards({ isPreview })
  const navigation = await getNavigation({ isPreview })
  const cardsIndex = indexArray(cards)
  const [id, display, versionId = null] = params.rest || []
  const isOfficialCard = id in cardsIndex
  const versions = isOfficialCard
    ? await getChangesFromCard({ id, isPreview })
    : []

  if (
    // Invalid view keyword
    (display && display !== 'display') ||
    // Version ID with a non-official card
    (versionId && !isOfficialCard) ||
    // Invalid version ID
    (versionId && !versions.some(v => String(v.timestamp) === versionId))
  ) {
    return { notFound: true }
  }

  if (!id) {
    return {
      props: {
        navigation,
        cards,
        cardId: null,
        card: {},
        contest: null,
        mode: 'EDITOR',
        versionId: null,
        versions: [],
      },
    }
  }

  return {
    props: {
      navigation,
      cards,
      cardId: id,
      card: getInitialCardData(cards, id),
      contest:
        id in cardsIndex ? null : await getSWCCFromCard({ id, isPreview }),
      versionId,
      versions,
      mode: display === 'display' ? 'DISPLAY' : 'EDITOR',
    },
  }
}

const CardBuilderPage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['TOOLS', 'BUILDERS', 'CARD_BUILDER']}
    navigation={navigation}
  >
    {props.mode === 'DISPLAY' ? (
      <CardBuilderApp {...props} />
    ) : (
      <CardBuilderEditor {...props} />
    )}
  </Layout>
)

export default CardBuilderPage
