import React from 'react'
import ListBuilderDisplayView from '~/components/ListBuilderDisplayView'
import ListBuilderEditorView from '~/components/ListBuilderEditorView'
import Layout from '~/components/Layout'
import getInitialListData from '~/helpers/getInitialListData'
import getNavigation from '~/helpers/getNavigation'

export async function getStaticPaths() {
  return { paths: [{ params: { rest: [] } }], fallback: 'blocking' }
}

export async function getStaticProps(context) {
  const navigation = getNavigation()
  const params = context.params.rest || []
  const DEFAULT_PROPS = { navigation, tiers: [], id: null, mode: 'EDITOR' }

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

const ListBuilderPage = props => (
  <Layout
    active={['TOOLS', 'BUILDERS', 'LIST_BUILDER']}
    navigation={props.navigation}
  >
    {props.mode === 'DISPLAY' ? (
      <ListBuilderDisplayView tiers={props.tiers} listId={props.id} />
    ) : (
      <ListBuilderEditorView tiers={props.tiers} listId={props.id} />
    )}
  </Layout>
)

export default ListBuilderPage
