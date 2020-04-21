import React from 'react'
import loadable from '@loadable/component'
import { Switch, useRouteMatch } from 'react-router-dom'
import Loader from '../Loader'
import Page from '../Page'

const options = { fallback: <Loader /> }
const Collection = loadable(() => import('../Collection'), options)
const BooksCalculator = loadable(() => import('../BooksCalculator'), options)
const Stats = loadable(() => import('../Stats'), options)

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
