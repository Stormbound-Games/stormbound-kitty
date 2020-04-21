import React from 'react'
import loadable from '@loadable/component'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Page from '../Page'
import Loader from '../Loader'
import Error from '../Error'
import RouterCollection from '../RouterCollection'
import RouterGuides from '../RouterGuides'
import RouterListBuilder from '../RouterListBuilder'
import RouterQuestBuilder from '../RouterQuestBuilder'
import RouterStories from '../RouterStories'

const options = { fallback: <Loader /> }
const FAQ = loadable(() => import('../FAQ'), options)
const BattleSimDisplay = loadable(() => import('../BattleSimDisplay'), options)
const BattleSimPuzzles = loadable(() => import('../BattleSimPuzzles'), options)
const BattleSimRoot = loadable(() => import('../BattleSimRoot'), options)
const CardBuilderContest = loadable(
  () => import('../CardBuilderContest'),
  options
)
const CardBuilderRoot = loadable(() => import('../CardBuilderRoot'), options)
const CardBuilderDisplay = loadable(
  () => import('../CardBuilderDisplay'),
  options
)
const DeckBuilderSuggestions = loadable(
  () => import('../DeckBuilderSuggestions'),
  options
)

const DeckBuilderRoot = loadable(() => import('../DeckBuilderRoot'), options)
const DeckBuilderDetailView = loadable(
  () => import('../DeckBuilderDetailView'),
  options
)
const DeckBuilderDryRunView = loadable(
  () => import('../DeckBuilderDryRunView'),
  options
)
const DeckBuilderTrackerView = loadable(
  () => import('../DeckBuilderTrackerView'),
  options
)
const DeckBuilderEditorView = loadable(
  () => import('../DeckBuilderEditorView'),
  options
)

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

      <Page path='/card/contest' active='CARD_BUILDER'>
        <CardBuilderContest />
      </Page>
      <Page path='/card/:cardId/display' active='CARD_BUILDER'>
        <CardBuilderDisplay />
      </Page>
      <Page path='/card/:cardId' active='CARD_BUILDER'>
        <CardBuilderRoot />
      </Page>
      <Page path='/card' active='CARD_BUILDER'>
        <CardBuilderRoot />
      </Page>

      <Page path='/deck/suggestions' active='DECK_BUILDER'>
        <DeckBuilderSuggestions />
      </Page>
      <Page path='/deck/collection' active='DECK_BUILDER'>
        <Redirect to='/collection' />
      </Page>
      <Page path='/deck/:deckId/detail' active='DECK_BUILDER'>
        <DeckBuilderRoot>
          {state => <DeckBuilderDetailView {...state} />}
        </DeckBuilderRoot>
      </Page>
      <Page path='/deck/:deckId/dry-run' active='DECK_BUILDER'>
        <DeckBuilderRoot>
          {state => <DeckBuilderDryRunView {...state} />}
        </DeckBuilderRoot>
      </Page>
      <Page path='/deck/:deckId/tracker' active='DECK_BUILDER'>
        <DeckBuilderRoot>
          {state => <DeckBuilderTrackerView {...state} />}
        </DeckBuilderRoot>
      </Page>
      <Page path='/deck/:deckId' active='DECK_BUILDER'>
        <DeckBuilderRoot>
          {state => <DeckBuilderEditorView {...state} />}
        </DeckBuilderRoot>
      </Page>
      <Page path='/deck' active='DECK_BUILDER'>
        <DeckBuilderRoot>
          {state => <DeckBuilderEditorView {...state} />}
        </DeckBuilderRoot>
      </Page>

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
