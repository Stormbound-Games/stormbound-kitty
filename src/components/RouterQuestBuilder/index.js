import React from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'
import Page from '../Page'
import load from '../../helpers/load'

const QuestBuilderRoot = load('QuestBuilderRoot')

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
