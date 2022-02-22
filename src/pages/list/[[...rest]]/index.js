import React from 'react'
import ListBuilderDisplayView from '~/components/ListBuilderDisplayView'
import ListBuilderEditorView from '~/components/ListBuilderEditorView'
import Layout from '~/components/Layout'
import getInitialListData from '~/helpers/getInitialListData'
import getNavigation from '~/helpers/getNavigation'
import { DEFAULT_LIST } from '~/constants/list'

export async function getStaticPaths() {
  return { paths: [{ params: { rest: [] } }], fallback: 'blocking' }
}

export async function getStaticProps(context) {
  const isPreview = context.preview || false
  const params = context.params.rest || []
  const navigation = await getNavigation({ isPreview })
  const DEFAULT_PROPS = {
    navigation,
    tiers: DEFAULT_LIST,
    id: null,
    mode: 'EDITOR',
  }

  try {
    const [id, display] = params

    if (display && display !== 'display') {
      return { notFound: true }
    }

    if (!id) {
      return { props: DEFAULT_PROPS }
    }

    const tiers = getInitialListData(id)

    return {
      props: {
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

const ListBuilderPage = ({ navigation, ...props }) => (
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
