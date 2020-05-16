import React from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'
import Page from '../Page'
import load from '../../helpers/load'

const BrawlIndex = load('BrawlIndex')
const BrawlPage = load('BrawlPage')
const BrawlOverview = load('BrawlOverview')

export default function RouterBrawl() {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Page path={`${path}/overview`} active={['BRAWL', 'OVERVIEW']}>
        <BrawlOverview />
      </Page>
      <Page path={`${path}/:id`} active={['BRAWL', 'TRACKER']}>
        <BrawlPage />
      </Page>
      <Page path={path} active={['BRAWL', 'INDEX']}>
        <BrawlIndex />
      </Page>
    </Switch>
  )
}
