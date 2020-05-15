import React from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'
import Page from '../Page'
import load from '../../helpers/load'

const BrawlPage = load('BrawlPage')
const BrawlIndex = load('BrawlIndex')

export default function RouterBrawl() {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Page path='/brawl/:id' active={['BRAWL', 'INDEX']}>
        <BrawlPage />
      </Page>
      <Page path={path} active={['BRAWL', 'INDEX']}>
        <BrawlIndex />
      </Page>
    </Switch>
  )
}
