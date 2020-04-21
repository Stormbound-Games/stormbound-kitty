import React from 'react'
import loadable from '@loadable/component'
import { Switch, useRouteMatch } from 'react-router-dom'
import Loader from '../Loader'
import Page from '../Page'

const options = { fallback: <Loader /> }
const ListBuilderDisplayView = loadable(
  () => import('../ListBuilderDisplayView'),
  options
)
const ListBuilderEditorView = loadable(
  () => import('../ListBuilderEditorView'),
  options
)
const RankedList = loadable(() => import('../RankedList'), options)
const EqualsList = loadable(() => import('../EqualsList'), options)

const RouterListBuilder = props => {
  const { path } = useRouteMatch()
  const active = 'LIST_BUILDER'

  return (
    <Switch>
      <Page path={`${path}/ranked`} active={active}>
        <RankedList />
      </Page>
      <Page path={`${path}/equals`} active={active}>
        <EqualsList />
      </Page>
      <Page path={`${path}/:listId/display`} active={active}>
        <ListBuilderDisplayView />
      </Page>
      <Page path={`${path}/:listId`} active={active}>
        <ListBuilderEditorView />
      </Page>
      <Page path={path} active={active}>
        <ListBuilderEditorView />
      </Page>
    </Switch>
  )
}

export default RouterListBuilder
