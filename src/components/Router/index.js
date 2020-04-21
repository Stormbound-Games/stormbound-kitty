import React from 'react'
import loadable from '@loadable/component'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Page from '../Page'
import Loader from '../Loader'
import Error from '../Error'
import RouterCardBuilder from '../RouterCardBuilder'
import RouterCollection from '../RouterCollection'
import RouterDeckBuilder from '../RouterDeckBuilder'
import RouterGuides from '../RouterGuides'
import RouterListBuilder from '../RouterListBuilder'
import RouterQuestBuilder from '../RouterQuestBuilder'
import RouterStories from '../RouterStories'

const options = { fallback: <Loader /> }
const FAQ = loadable(() => import('../FAQ'), options)
const BattleSimDisplay = loadable(() => import('../BattleSimDisplay'), options)
const BattleSimPuzzles = loadable(() => import('../BattleSimPuzzles'), options)
const BattleSimRoot = loadable(() => import('../BattleSimRoot'), options)

const Brawl = loadable(() => import('../Brawl'), options)
const Home = loadable(() => import('../Home'), options)
const Member = loadable(() => import('../Member'), options)

const Router = props => (
  <BrowserRouter>
    <Switch>
      <Page path='/sim/:simId/display' active='BATTLE_SIM'>
        <BattleSimDisplay />
      </Page>
      <Page path='/sim/puzzles' active='BATTLE_SIM'>
        <BattleSimPuzzles />
      </Page>
      <Page path='/sim/:simId' active='BATTLE_SIM'>
        <BattleSimRoot />
      </Page>
      <Page path='/sim' active='BATTLE_SIM'>
        <BattleSimRoot />
      </Page>

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

      <Page path='/brawl' active='HOME'>
        <Brawl />
      </Page>

      <Page path='/faq' active='HOME'>
        <FAQ />
      </Page>

      <Page exact path='/' active='HOME'>
        <Home />
      </Page>

      <Page path='/member/:memberId'>
        <Member />
      </Page>

      <Page path='*'>
        <Error error='HTTP 404 — Not Found' />
      </Page>
    </Switch>
  </BrowserRouter>
)

export default Router
