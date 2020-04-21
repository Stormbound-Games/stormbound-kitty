import React from 'react'
import loadable from '@loadable/component'
import { Switch, useRouteMatch } from 'react-router-dom'
import Loader from '../Loader'
import Page from '../Page'

const options = { fallback: <Loader /> }
const GuideComplete = loadable(() => import('../GuideComplete'), options)
const GuideDeck = loadable(() => import('../GuideDeck'), options)
const GuidePirate = loadable(() => import('../GuidePirate'), options)
const Guides = loadable(() => import('../Guides'), options)
const GuideWinter = loadable(() => import('../GuideWinter'), options)
const Lexicon = loadable(() => import('../Lexicon'), options)

const RouterGuides = props => {
  const { path } = useRouteMatch()
  const active = 'GUIDES'

  return (
    <Switch>
      <Page path={`${path}/complete`} active={active}>
        <GuideComplete />
      </Page>
      <Page path={`${path}/deck`} active={active}>
        <GuideDeck />
      </Page>
      <Page path={`${path}/winter`} active={active}>
        <GuideWinter />
      </Page>
      <Page path={`${path}/pirate`} active={active}>
        <GuidePirate />
      </Page>
      <Page path={`${path}/lexicon`} active={active}>
        <Lexicon />
      </Page>
      <Page exact path={path} active={active}>
        <Guides />
      </Page>
    </Switch>
  )
}

export default RouterGuides
