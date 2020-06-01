import React from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'
import Page from '../Page'
import Error from '../Error'
import load from '../../helpers/load'

const Guides = load('Guides')
const GuideBeginner = load('GuideBeginner')
const GuideComplete = load('GuideComplete')
const GuideDeck = load('GuideDeck')
const GuideDrawing = load('GuideDrawing')
const GuidePirate = load('GuidePirate')
const GuideResources = load('GuideResources')
const GuideWinter = load('GuideWinter')
const Lexicon = load('Lexicon')

export default function RouterGuides() {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Page path={`${path}/beginner`} active={['GUIDES', 'BEGINNER']}>
        <GuideBeginner />
      </Page>
      <Page path={`${path}/resources`} active={['GUIDES', 'RESOURCES']}>
        <GuideResources />
      </Page>
      <Page path={`${path}/complete`} active={['GUIDES', 'COMPLETE']}>
        <GuideComplete />
      </Page>
      <Page path={`${path}/deck`} active={['GUIDES', 'DECK']}>
        <GuideDeck />
      </Page>
      <Page path={`${path}/drawing`} active={['GUIDES', 'DRAWING']}>
        <GuideDrawing />
      </Page>
      <Page path={`${path}/winter`} active={['GUIDES', 'WINTER']}>
        <GuideWinter />
      </Page>
      <Page path={`${path}/pirate`} active={['GUIDES', 'PIRATE']}>
        <GuidePirate />
      </Page>
      <Page path={`${path}/lexicon`} active={['GUIDES', 'LEXICON']}>
        <Lexicon />
      </Page>
      <Page exact path={path} active={['GUIDES', 'INDEX']}>
        <Guides />
      </Page>
      <Page path='*' active={['GUIDES']}>
        <Error error='HTTP 404 — Not Found' />
      </Page>
    </Switch>
  )
}
