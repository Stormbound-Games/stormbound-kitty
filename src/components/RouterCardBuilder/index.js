import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Layout from '../Layout'
import load from '../../helpers/load'

const CardBuilderContest = load('CardBuilderContest')
const CardBuilderRoot = load('CardBuilderRoot')
const CardBuilderDisplay = load('CardBuilderDisplay')

const RouterCardBuilder = props => {
  const { path } = useRouteMatch()

  return (
    <Layout active='CARD_BUILDER'>
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
    </Layout>
  )
}

export default RouterCardBuilder
