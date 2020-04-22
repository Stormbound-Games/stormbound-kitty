import React from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'
import Page from '../Page'
import load from '../../helpers/load'

const ListBuilderDisplayView = load('ListBuilderDisplayView')
const ListBuilderEditorView = load('ListBuilderEditorView')
const RankedList = load('RankedList')
const EqualsList = load('EqualsList')

const RouterListBuilder = () => {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Page path={`${path}/ranked`} active='LIST_BUILDER'>
        <RankedList />
      </Page>
      <Page path={`${path}/equals`} active='LIST_BUILDER'>
        <EqualsList />
      </Page>
      <Page path={`${path}/:listId/display`} active='LIST_BUILDER'>
        <ListBuilderDisplayView />
      </Page>
      <Page path={`${path}/:listId`} active='LIST_BUILDER'>
        <ListBuilderEditorView />
      </Page>
      <Page path={path} active='LIST_BUILDER'>
        <ListBuilderEditorView />
      </Page>
    </Switch>
  )
}

export default RouterListBuilder
