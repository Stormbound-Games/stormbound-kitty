import React from 'react'
import CardBuilderEditor from '~/components/CardBuilderEditor'
import CardBuilderApp from '~/components/CardBuilderApp'
import Layout from '~/components/Layout'
import getInitialCardData from '~/helpers/getInitialCardData'
import getNavigation from '~/helpers/getNavigation'
import isCardOfficial from '~/helpers/isCardOfficial'
import parseDate from '~/helpers/parseDate'
import CARDS from '~/data/cards'
import CHANGELOG from '~/data/changelog'
import getSWCCFromCard from '~/api/swcc/getSWCCFromCard'

const getChangelog = id => {
  if (!isCardOfficial(id)) return []

  return CHANGELOG.filter(change => change.id === id)
    .map(change => ({ ...change, timestamp: parseDate(change.date).valueOf() }))
    .sort((a, b) => b.timestamp - a.timestamp)
}

export async function getStaticPaths() {
  const paths = CARDS.filter(card => !card.token)
    .map(card => card.id)
    .map(id =>
      getChangelog(id).map(change => ({
        params: { rest: [id, 'display', String(change.timestamp)] },
      }))
    )
    .flat()
    .concat([{ params: { rest: [] } }])

  return { paths, fallback: 'blocking' }
}

export async function getStaticProps(context) {
  const params = context.params.rest || []
  const navigation = getNavigation()
  const DEFAULT_PROPS = {
    navigation,
    cardId: null,
    card: {},
    contest: null,
    mode: 'EDITOR',
    versionId: null,
    versions: [],
  }

  try {
    const [id, display, versionId = null] = params
    const versions = getChangelog(id)

    if (
      // Invalid view keyword
      (display && display !== 'display') ||
      // Version ID with a non-official card
      (versionId && !isCardOfficial(id)) ||
      // Invalid version ID
      (versionId && !versions.some(v => String(v.timestamp) === versionId))
    ) {
      return { notFound: true }
    }

    if (!id) {
      return {
        props: DEFAULT_PROPS,
      }
    }

    return {
      props: {
        navigation,
        cardId: id,
        card: getInitialCardData(id),
        contest: await getSWCCFromCard(id),
        versionId,
        versions,
        mode: display === 'display' ? 'DISPLAY' : 'EDITOR',
      },
    }
  } catch (error) {
    return {
      props: DEFAULT_PROPS,
    }
  }
}

const CardBuilderPage = ({ navigation, ...props }) => (
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
