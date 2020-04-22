import React from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'
import Error from '../Error'
import Page from '../Page'
import load from '../../helpers/load'

const GuideComplete = load('GuideComplete')
const GuideDeck = load('GuideDeck')
const GuidePirate = load('GuidePirate')
const Guides = load('Guides')
const GuideWinter = load('GuideWinter')
const Lexicon = load('Lexicon')

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
      <Page path='*'>
        <Error error='HTTP 404 — Not Found' />
      </Page>
    </Switch>
  )
}

export default RouterGuides
