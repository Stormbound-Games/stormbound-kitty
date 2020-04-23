import React from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'
import Page from '../Page'
import load from '../../helpers/load'

const Collection = load('Collection')
const BooksCalculator = load('BooksCalculator')
const CollectionStats = load('CollectionStats')

const RouterCollection = () => {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Page path={`${path}/books`} active={['COLLECTION', 'BOOKS']}>
        <BooksCalculator />
      </Page>
      <Page path={`${path}/stats`} active={['COLLECTION', 'STATS']}>
        <CollectionStats />
      </Page>
      <Page exact path={path} active={['COLLECTION', 'INDEX']}>
        <Collection />
      </Page>
    </Switch>
  )
}

export default RouterCollection
