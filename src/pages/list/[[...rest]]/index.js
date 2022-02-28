import React from 'react'
import ListBuilderDisplayView from '~/components/ListBuilderDisplayView'
import ListBuilderEditorView from '~/components/ListBuilderEditorView'
import Layout from '~/components/Layout'
import getInitialListData from '~/helpers/getInitialListData'
import getNavigation from '~/helpers/getNavigation'
import { DEFAULT_LIST } from '~/constants/list'
import getCards from '~/api/cards/getCards'

export async function getStaticPaths() {
  return { paths: [{ params: { rest: [] } }], fallback: 'blocking' }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const cards = await getCards({ isPreview })
  const navigation = await getNavigation({ isPreview })
  const DEFAULT_PROPS = {
    cards,
    navigation,
    tiers: DEFAULT_LIST,
    id: null,
    mode: 'EDITOR',
  }

  try {
    const [id, display] = params.rest || []

    if (display && display !== 'display') {
      return { notFound: true }
    }

    if (!id) {
      return { props: DEFAULT_PROPS }
    }

    const tiers = getInitialListData(id)

    return {
      props: {
        cards,
        navigation,
        tiers,
        id,
        mode: display === 'display' ? 'DISPLAY' : 'EDITOR',
      },
    }
  } catch (error) {
    return { props: DEFAULT_PROPS }
  }
}

const ListBuilderPage = ({ navigation, cards, ...props }) => (
  <Layout
    active={['TOOLS', 'BUILDERS', 'LIST_BUILDER']}
    navigation={navigation}
  >
    {props.mode === 'DISPLAY' ? (
      <ListBuilderDisplayView {...props} listId={props.id} />
    ) : (
      <ListBuilderEditorView {...props} listId={props.id} />
    )}
  </Layout>
)

export default ListBuilderPage
