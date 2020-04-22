import React from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'
import Page from '../Page'
import load from '../../helpers/load'

const Collection = load('Collection')
const BooksCalculator = load('BooksCalculator')
const Stats = load('Stats')

const RouterCollection = props => {
  const { path } = useRouteMatch()
  const active = 'COLLECTION'

  return (
    <Switch>
      <Page path={`${path}/books`} active={active}>
        <BooksCalculator />
      </Page>
      <Page path={`${path}/stats`} active={active}>
        <Stats />
      </Page>
      <Page exact path={path} active={active}>
        <Collection />
      </Page>
    </Switch>
  )
}

export default RouterCollection
