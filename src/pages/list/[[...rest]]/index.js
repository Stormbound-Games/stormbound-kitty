import React from 'react'
import ListBuilderDisplayView from '~/components/ListBuilderDisplayView'
import ListBuilderEditorView from '~/components/ListBuilderEditorView'
import Layout from '~/components/Layout'
import getInitialListData from '~/helpers/getInitialListData'

export async function getStaticPaths() {
  return { paths: [{ params: { rest: [] } }], fallback: true }
}

export async function getStaticProps(context) {
  const params = context.params.rest || []

  try {
    const [id, display] = params

    if (display && display !== 'display') {
      return { notFound: true }
    }

    if (!id) {
      return { props: { tiers: [], id: null, mode: 'EDITOR' } }
    }

    const tiers = getInitialListData(id)

    return {
      props: { tiers, id, mode: display === 'display' ? 'DISPLAY' : 'EDITOR' },
    }
  } catch (error) {
    return { props: { tiers: [], id: null, mode: 'EDITOR' } }
  }
}

const ListBuilderPage = props => (
  <Layout active={['TOOLS', 'LIST_BUILDER', props.mode]}>
    {props.mode === 'DISPLAY' ? (
      <ListBuilderDisplayView tiers={props.tiers} listId={props.id} />
    ) : (
      <ListBuilderEditorView tiers={props.tiers} listId={props.id} />
    )}
  </Layout>
)

export default ListBuilderPage
