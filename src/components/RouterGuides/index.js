import React from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'
import Page from '../Page'
import Error from '../Error'
import load from '../../helpers/load'

const GuideComplete = load('GuideComplete')
const GuideDeck = load('GuideDeck')
const GuidePirate = load('GuidePirate')
const Guides = load('Guides')
const GuideWinter = load('GuideWinter')
const Lexicon = load('Lexicon')

const RouterGuides = () => {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Page path={`${path}/complete`} active='GUIDES'>
        <GuideComplete />
      </Page>
      <Page path={`${path}/deck`} active='GUIDES'>
        <GuideDeck />
      </Page>
      <Page path={`${path}/winter`} active='GUIDES'>
        <GuideWinter />
      </Page>
      <Page path={`${path}/pirate`} active='GUIDES'>
        <GuidePirate />
      </Page>
      <Page path={`${path}/lexicon`} active='GUIDES'>
        <Lexicon />
      </Page>
      <Page exact path={path} active='GUIDES'>
        <Guides />
      </Page>
      <Page path='*' active='GUIDES'>
        <Error error='HTTP 404 — Not Found' />
      </Page>
    </Switch>
  )
}

export default RouterGuides
