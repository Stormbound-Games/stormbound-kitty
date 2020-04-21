import React from 'react'
import loadable from '@loadable/component'
import { Switch, useRouteMatch } from 'react-router-dom'
import Loader from '../Loader'
import Page from '../Page'

const options = { fallback: <Loader /> }
const QuestBuilderRoot = loadable(() => import('../QuestBuilderRoot'), options)

const RouterQuestBuilder = props => {
  const { path } = useRouteMatch()
  const active = null

  return (
    <Switch>
      <Page path={`${path}/:questId`} active={active}>
        <QuestBuilderRoot />
      </Page>
      <Page path={path} active={active}>
        <QuestBuilderRoot />
      </Page>
    </Switch>
  )
}

export default RouterQuestBuilder
