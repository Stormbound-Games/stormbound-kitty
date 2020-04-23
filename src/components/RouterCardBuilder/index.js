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
      <Page path={`${path}/contest`} active={['CARD_BUILDER', 'CONTEST']}>
        <CardBuilderContest />
      </Page>
      <Page
        path={`${path}/:cardId/display`}
        active={['CARD_BUILDER', 'DISPLAY']}
      >
        <CardBuilderDisplay />
      </Page>
      <Page path={`${path}/:cardId`} active={['CARD_BUILDER', 'EDITOR']}>
        <CardBuilderRoot />
      </Page>
      <Page path={path} active={['CARD_BUILDER', 'EDITOR']}>
        <CardBuilderRoot />
      </Page>
    </Switch>
  )
}

export default RouterCardBuilder
