import React from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'
import Page from '../Page'
import load from '../../helpers/load'

const QuestBuilderRoot = load('QuestBuilderRoot')

const RouterQuestBuilder = () => {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Page path={`${path}/:questId`}>
        <QuestBuilderRoot />
      </Page>
      <Page path={path}>
        <QuestBuilderRoot />
      </Page>
    </Switch>
  )
}

export default RouterQuestBuilder
