import React from 'react'
import ListBuilderEditorView from '~/components/ListBuilderEditorView'
import Layout from '~/components/Layout'
import getInitialListData from '~/helpers/getInitialListData'

export async function getStaticPaths() {
  return { paths: [], fallback: true }
}

export async function getStaticProps(context) {
  const tiers = getInitialListData(context.params.id)

  return { props: { tiers, id: context.params.id } }
}

export default props => (
  <Layout active={['TOOLS', 'LIST_BUILDER', 'EDITOR']}>
    <ListBuilderEditorView tiers={props.tiers} listId={props.id} />
  </Layout>
)
