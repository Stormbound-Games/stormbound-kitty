import React from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'
import Page from '../Page'
import load from '../../helpers/load'

const CardBuilderContest = load('CardBuilderContest')
const CardBuilderRoot = load('CardBuilderRoot')
const CardBuilderDisplay = load('CardBuilderDisplay')

const RouterCardBuilder = () => {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Page path={`${path}/contest`} active='CARD_BUILDER'>
        <CardBuilderContest />
      </Page>
      <Page path={`${path}/:cardId/display`} active='CARD_BUILDER'>
        <CardBuilderDisplay />
      </Page>
      <Page path={`${path}/:cardId`} active='CARD_BUILDER'>
        <CardBuilderRoot />
      </Page>
      <Page path={path} active='CARD_BUILDER'>
        <CardBuilderRoot />
      </Page>
    </Switch>
  )
}

export default RouterCardBuilder
