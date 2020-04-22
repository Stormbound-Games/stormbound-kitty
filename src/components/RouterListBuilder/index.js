import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Layout from '../Layout'
import load from '../../helpers/load'

const ListBuilderDisplayView = load('ListBuilderDisplayView')
const ListBuilderEditorView = load('ListBuilderEditorView')
const RankedList = load('RankedList')
const EqualsList = load('EqualsList')

const RouterListBuilder = props => {
  const { path } = useRouteMatch()

  return (
    <Layout active='LIST_BUILDER'>
      <Switch>
        <Route path={`${path}/ranked`}>
          <RankedList />
        </Route>
        <Route path={`${path}/equals`}>
          <EqualsList />
        </Route>
        <Route path={`${path}/:listId/display`}>
          <ListBuilderDisplayView />
        </Route>
        <Route path={`${path}/:listId`}>
          <ListBuilderEditorView />
        </Route>
        <Route path={path}>
          <ListBuilderEditorView />
        </Route>
      </Switch>
    </Layout>
  )
}

export default RouterListBuilder
