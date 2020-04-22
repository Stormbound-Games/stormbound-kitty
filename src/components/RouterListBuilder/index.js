import React from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'
import Page from '../Page'
import load from '../../helpers/load'

const ListBuilderDisplayView = load('ListBuilderDisplayView')
const ListBuilderEditorView = load('ListBuilderEditorView')
const RankedList = load('RankedList')
const EqualsList = load('EqualsList')

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
