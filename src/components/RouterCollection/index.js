import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import load from '../../helpers/load'

const Collection = load('Collection')
const BooksCalculator = load('BooksCalculator')
const Stats = load('Stats')

const RouterCollection = ({ setActive }) => {
  const { path } = useRouteMatch()

  React.useEffect(() => setActive('COLLECTION'), [setActive])

  return (
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
  )
}

export default RouterCollection
