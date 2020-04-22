import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import load from '../../helpers/load'

const QuestBuilderRoot = load('QuestBuilderRoot')

const RouterQuestBuilder = ({ setActive }) => {
  const { path } = useRouteMatch()

  React.useEffect(() => setActive(null), [setActive])

  return (
    <Switch>
      <Route path={`${path}/:questId`}>
        <QuestBuilderRoot />
      </Route>
      <Route path={path}>
        <QuestBuilderRoot />
      </Route>
    </Switch>
  )
}

export default RouterQuestBuilder
