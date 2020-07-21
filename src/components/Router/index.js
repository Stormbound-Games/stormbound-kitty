import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Error from '../Error'
import Page from '../Page'
import RouterBattleSim from '../RouterBattleSim'
import RouterBrawl from '../RouterBrawl'
import RouterCardBuilder from '../RouterCardBuilder'
import RouterCollection from '../RouterCollection'
import RouterDecks from '../RouterDecks'
import RouterGuides from '../RouterGuides'
import RouterListBuilder from '../RouterListBuilder'
import RouterQuestBuilder from '../RouterQuestBuilder'
import RouterStories from '../RouterStories'
import load from '../../helpers/load'

const Donate = load('Donate')
const FAQ = load('FAQ')
const Home = load('Home')
const Member = load('Member')
const FanKit = load('FanKit')
const Changelog = load('Changelog')
const ChangelogJuly2020 = load('ChangelogJuly2020')

export default function Router(props) {
  return (
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
            <RouterDecks />
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

          <Route path='/brawl'>
            <RouterBrawl />
          </Route>

          <Page path='/member/:memberId'>
            <Member />
          </Page>

          <Page path='/fan-kit' active={['HOME', 'FAN_KIT']}>
            <FanKit />
          </Page>

          <Page path='/changelog/07-2020' active={['HOME', '07_2020']}>
            <ChangelogJuly2020 />
          </Page>

          <Page path='/changelog' exact active={['HOME', 'CHANGELOG']}>
            <Changelog />
          </Page>

          <Page path='/faq' active={['HOME', 'FAQ']}>
            <FAQ />
          </Page>

          <Page path='/donate' active={['DONATE']}>
            <Donate />
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
}
