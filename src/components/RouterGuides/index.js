import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Error from '../Error'
import Layout from '../Layout'
import load from '../../helpers/load'

const GuideComplete = load('GuideComplete')
const GuideDeck = load('GuideDeck')
const GuidePirate = load('GuidePirate')
const Guides = load('Guides')
const GuideWinter = load('GuideWinter')
const Lexicon = load('Lexicon')

const RouterGuides = props => {
  const { path } = useRouteMatch()

  return (
    <Layout active='GUIDES'>
      <Switch>
        <Route path={`${path}/complete`}>
          <GuideComplete />
        </Route>
        <Route path={`${path}/deck`}>
          <GuideDeck />
        </Route>
        <Route path={`${path}/winter`}>
          <GuideWinter />
        </Route>
        <Route path={`${path}/pirate`}>
          <GuidePirate />
        </Route>
        <Route path={`${path}/lexicon`}>
          <Lexicon />
        </Route>
        <Route exact path={path}>
          <Guides />
        </Route>
        <Route path='*'>
          <Error error='HTTP 404 — Not Found' />
        </Route>
      </Switch>
    </Layout>
  )
}

export default RouterGuides
