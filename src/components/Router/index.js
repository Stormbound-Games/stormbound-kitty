import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Error from '../Error'
import Page from '../Page'
import RouterBattleSim from '../RouterBattleSim'
import RouterCardBuilder from '../RouterCardBuilder'
import RouterCollection from '../RouterCollection'
import RouterDeckBuilder from '../RouterDeckBuilder'
import RouterGuides from '../RouterGuides'
import RouterListBuilder from '../RouterListBuilder'
import RouterQuestBuilder from '../RouterQuestBuilder'
import RouterStories from '../RouterStories'
import load from '../../helpers/load'

const FAQ = load('FAQ')
const Brawl = load('Brawl')
const Home = load('Home')
const Member = load('Member')
const FanKit = load('FanKit')

const Router = props => (
  <AnimatePresence exitBeforeEnter>
    <BrowserRouter>
      <Switch>
        <Route path='/sim'>
          <RouterBattleSim />
        </Route>

        <Route path='/card'>
          <RouterCardBuilder />
        </Route>

        <Route path='/deck'>
          <RouterDeckBuilder />
        </Route>

        <Route path='/collection'>
          <RouterCollection />
        </Route>

        <Route path='/quest'>
          <RouterQuestBuilder />
        </Route>

        <Route path='/stories'>
          <RouterStories />
        </Route>

        <Route path='/guides'>
          <RouterGuides />
        </Route>

        <Route path='/list'>
          <RouterListBuilder />
        </Route>

        <Page path='/member/:memberId'>
          <Member />
        </Page>

        <Page path='/fan-kit'>
          <FanKit />
        </Page>

        <Page path='/brawl' active={['HOME', 'BRAWL']}>
          <Brawl />
        </Page>

        <Page path='/faq' active={['HOME', 'FAQ']}>
          <FAQ />
        </Page>

        <Page exact path='/' active={['HOME', 'NEWS']}>
          <Home />
        </Page>

        <Page path='*'>
          <Error error='HTTP 404 — Not Found' />
        </Page>
      </Switch>
    </BrowserRouter>
  </AnimatePresence>
)

export default Router
