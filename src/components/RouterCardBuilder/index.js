import React from 'react'
import loadable from '@loadable/component'
import { Switch, useRouteMatch } from 'react-router-dom'
import Loader from '../Loader'
import Page from '../Page'

const options = { fallback: <Loader /> }
const CardBuilderContest = loadable(
  () => import('../CardBuilderContest'),
  options
)
const CardBuilderRoot = loadable(() => import('../CardBuilderRoot'), options)
const CardBuilderDisplay = loadable(
  () => import('../CardBuilderDisplay'),
  options
)

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
