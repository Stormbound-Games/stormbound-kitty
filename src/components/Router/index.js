import React from 'react'
import loadable from '@loadable/component'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Loader from '../Loader'
import Layout from '../Layout'

const options = { fallback: <Loader /> }
const FAQ = loadable(() => import('../FAQ'), options)
const BSDisplay = loadable(() => import('../BSDisplay'), options)
const BSPuzzles = loadable(() => import('../BSPuzzles'), options)
const BSRoot = loadable(() => import('../BSRoot'), options)
const CBContest = loadable(() => import('../CBContest'), options)
const CBRoot = loadable(() => import('../CBRoot'), options)
const CBDisplay = loadable(() => import('../CBDisplay'), options)
const DBSuggestions = loadable(() => import('../DBSuggestions'), options)
const DBCollection = loadable(() => import('../DBCollection'), options)
const DBRoot = loadable(() => import('../DBRoot'), options)
const DBDetailView = loadable(() => import('../DBDetailView'), options)
const DBDryRunView = loadable(() => import('../DBDryRunView'), options)
const DBTrackerView = loadable(() => import('../DBTrackerView'), options)
const DBEditorView = loadable(() => import('../DBEditorView'), options)
const QBRoot = loadable(() => import('../QBRoot'), options)
const StoriesCategory = loadable(() => import('../StoriesCategory'), options)
const Story = loadable(() => import('../Story'), options)
const Stories = loadable(() => import('../Stories'), options)
const CompleteGuide = loadable(() => import('../CompleteGuide'), options)
const DeckGuide = loadable(() => import('../DeckGuide'), options)
const WinterGuide = loadable(() => import('../WinterGuide'), options)
const PirateGuide = loadable(() => import('../PirateGuide'), options)
const Lexicon = loadable(() => import('../Lexicon'), options)
const Guides = loadable(() => import('../Guides'), options)
const TLBDisplayView = loadable(() => import('../TLBDisplayView'), options)
const TLBEditorView = loadable(() => import('../TLBEditorView'), options)
const Home = loadable(() => import('../Home'), options)

const Page = ({ children, active, ...props }) => (
  <Route {...props}>
    <Layout active={active}>{children}</Layout>
  </Route>
)

const Router = props => (
  <BrowserRouter>
    <Switch>
      <Page path='/faq'>
        <FAQ />
      </Page>

      <Page path='/sim/:simId/display' active='BATTLE_SIM'>
        <BSDisplay />
      </Page>
      <Page path='/sim/puzzles' active='BATTLE_SIM'>
        <BSPuzzles />
      </Page>
      <Page path='/sim/:simId' active='BATTLE_SIM'>
        <BSRoot />
      </Page>
      <Page path='/sim' active='BATTLE_SIM'>
        <BSRoot />
      </Page>

      <Page path='/card/contest' active='CARD_BUILDER'>
        <CBContest />
      </Page>
      <Page path='/card/:cardId/display' active='CARD_BUILDER'>
        <CBDisplay />
      </Page>
      <Page path='/card/:cardId' active='CARD_BUILDER'>
        <CBRoot />
      </Page>
      <Page path='/card' active='CARD_BUILDER'>
        <CBRoot />
      </Page>

      <Page path='/deck/suggestions' active='DECK_BUILDER'>
        <DBSuggestions />
      </Page>
      <Page path='/deck/collection' active='DECK_BUILDER'>
        <DBCollection />
      </Page>
      <Page path='/deck/:deckId/detail' active='DECK_BUILDER'>
        <DBRoot>{state => <DBDetailView {...state} />}</DBRoot>
      </Page>
      <Page path='/deck/:deckId/dry-run' active='DECK_BUILDER'>
        <DBRoot>{state => <DBDryRunView {...state} />}</DBRoot>
      </Page>
      <Page path='/deck/:deckId/tracker' active='DECK_BUILDER'>
        <DBRoot>{state => <DBTrackerView {...state} />}</DBRoot>
      </Page>
      <Page path='/deck/:deckId' active='DECK_BUILDER'>
        <DBRoot>{state => <DBEditorView {...state} />}</DBRoot>
      </Page>
      <Page path='/deck' active='DECK_BUILDER'>
        <DBRoot>{state => <DBEditorView {...state} />}</DBRoot>
      </Page>

      <Page path='/quest/:questId'>
        <QBRoot />
      </Page>
      <Page path='/quest'>
        <QBRoot />
      </Page>

      <Page path='/stories/neutral' active='STORIES'>
        <StoriesCategory category='neutral' />
      </Page>
      <Page path='/stories/ironclad' active='STORIES'>
        <StoriesCategory category='ironclad' />
      </Page>
      <Page path='/stories/swarm' active='STORIES'>
        <StoriesCategory category='swarm' />
      </Page>
      <Page path='/stories/winter' active='STORIES'>
        <StoriesCategory category='winter' />
      </Page>
      <Page path='/stories/shadowfen' active='STORIES'>
        <StoriesCategory category='shadowfen' />
      </Page>
      <Page path='/stories/lore' active='STORIES'>
        <StoriesCategory category='lore' />
      </Page>
      <Page path='/stories/:storyId' active='STORIES'>
        <Story />
      </Page>
      <Page path='/stories' active='STORIES'>
        <Stories />
      </Page>

      <Page path='/guides/complete' active='GUIDES'>
        <CompleteGuide />
      </Page>
      <Page path='/guides/deck' active='GUIDES'>
        <DeckGuide />
      </Page>
      <Page path='/guides/winter' active='GUIDES'>
        <WinterGuide />
      </Page>
      <Page path='/guides/pirate' active='GUIDES'>
        <PirateGuide />
      </Page>
      <Page path='/guides/lexicon' active='GUIDES'>
        <Lexicon />
      </Page>
      <Page path='/guides' active='GUIDES'>
        <Guides />
      </Page>

      <Page path='/list/:listId/display' active='LIST_BUILDER'>
        <TLBDisplayView />
      </Page>
      <Page path='/list/:listId' active='LIST_BUILDER'>
        <TLBEditorView />
      </Page>
      <Page path='/list' active='LIST_BUILDER'>
        <TLBEditorView />
      </Page>

      <Page path='/'>
        <Home />
      </Page>
    </Switch>
  </BrowserRouter>
)

export default Router
