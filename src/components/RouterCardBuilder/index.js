import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import load from '../../helpers/load'

const CardBuilderContest = load('CardBuilderContest')
const CardBuilderRoot = load('CardBuilderRoot')
const CardBuilderDisplay = load('CardBuilderDisplay')

const RouterCardBuilder = ({ setActive }) => {
  const { path } = useRouteMatch()

  React.useEffect(() => setActive('CARD_BUILDER'), [setActive])

  return (
    <Switch>
      <Route path={`${path}/contest`}>
        <CardBuilderContest />
      </Route>
      <Route path={`${path}/:cardId/display`}>
        <CardBuilderDisplay />
      </Route>
      <Route path={`${path}/:cardId`}>
        <CardBuilderRoot />
      </Route>
      <Route path={path}>
        <CardBuilderRoot />
      </Route>
    </Switch>
  )
}

export default RouterCardBuilder
