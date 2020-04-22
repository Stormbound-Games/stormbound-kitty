import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Layout from '../Layout'
import load from '../../helpers/load'

const Collection = load('Collection')
const BooksCalculator = load('BooksCalculator')
const Stats = load('Stats')

const RouterCollection = props => {
  const { path } = useRouteMatch()

  return (
    <Layout active='COLLECTION'>
      <Switch>
        <Route path={`${path}/books`}>
          <BooksCalculator />
        </Route>
        <Route path={`${path}/stats`}>
          <Stats />
        </Route>
        <Route exact path={path}>
          <Collection />
        </Route>
      </Switch>
    </Layout>
  )
}

export default RouterCollection
