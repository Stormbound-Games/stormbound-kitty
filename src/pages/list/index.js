import React from 'react'
import ListBuilderEditorView from '~/components/ListBuilderEditorView'
import Layout from '~/components/Layout'

export default () => (
  <Layout active={['TOOLS', 'LIST_BUILDER', 'EDITOR']}>
    <ListBuilderEditorView tiers={[]} />
  </Layout>
)
