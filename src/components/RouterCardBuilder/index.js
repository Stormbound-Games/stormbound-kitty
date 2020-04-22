import React from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'
import Page from '../Page'
import load from '../../helpers/load'

const CardBuilderContest = load('CardBuilderContest')
const CardBuilderRoot = load('CardBuilderRoot')
const CardBuilderDisplay = load('CardBuilderDisplay')

const RouterCardBuilder = props => {
  const { path } = useRouteMatch()
  const active = 'CARD_BUILDER'

  return (
    <Switch>
      <Page path={`${path}/contest`} active={active}>
        <CardBuilderContest />
      </Page>
      <Page path={`${path}/:cardId/display`} active={active}>
        <CardBuilderDisplay />
      </Page>
      <Page path={`${path}/:cardId`} active={active}>
        <CardBuilderRoot />
      </Page>
      <Page path={path} active={active}>
        <CardBuilderRoot />
      </Page>
    </Switch>
  )
}

export default RouterCardBuilder
