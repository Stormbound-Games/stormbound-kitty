import React from 'react'
import ListBuilderEditorView from '~/components/ListBuilderEditorView'
import Layout from '~/components/Layout'

const ListBuilderPage = () => (
  <Layout active={['TOOLS', 'LIST_BUILDER', 'EDITOR']}>
    <ListBuilderEditorView tiers={[]} />
  </Layout>
)

export default ListBuilderPage
