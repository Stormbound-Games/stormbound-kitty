import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Layout from '../Layout'
import load from '../../helpers/load'

const QuestBuilderRoot = load('QuestBuilderRoot')

const RouterQuestBuilder = props => {
  const { path } = useRouteMatch()

  return (
    <Layout>
      <Switch>
        <Route path={`${path}/:questId`}>
          <QuestBuilderRoot />
        </Route>
        <Route path={path}>
          <QuestBuilderRoot />
        </Route>
      </Switch>
    </Layout>
  )
}

export default RouterQuestBuilder
