import React from 'react'
import loadable from '@loadable/component'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Layout from '../Layout'
import Loader from '../Loader'
import Error from '../Error'

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
const Collection = loadable(() => import('../Collection'), options)
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
const QuestBuilderRoot = loadable(() => import('../QuestBuilderRoot'), options)
const StoriesCategory = loadable(() => import('../StoriesCategory'), options)
const Story = loadable(() => import('../Story'), options)
const Stories = loadable(() => import('../Stories'), options)
const CompleteGuide = loadable(() => import('../CompleteGuide'), options)
const DeckGuide = loadable(() => import('../DeckGuide'), options)
const WinterGuide = loadable(() => import('../WinterGuide'), options)
const PirateGuide = loadable(() => import('../PirateGuide'), options)
const Lexicon = loadable(() => import('../Lexicon'), options)
const Guides = loadable(() => import('../Guides'), options)
const ListBuilderDisplayView = loadable(
  () => import('../ListBuilderDisplayView'),
  options
)
const ListBuilderEditorView = loadable(
  () => import('../ListBuilderEditorView'),
  options
)
const RankedList = loadable(() => import('../RankedList'), options)
const EqualsList = loadable(() => import('../EqualsList'), options)
const BooksCalculator = loadable(() => import('../BooksCalculator'), options)
const Stats = loadable(() => import('../Stats'), options)
const Brawl = loadable(() => import('../Brawl'), options)
const Home = loadable(() => import('../Home'), options)
const Member = loadable(() => import('../Member'), options)

const Page = ({ children, active, ...props }) => (
  <Route {...props}>
    <Layout active={active}>{children}</Layout>
  </Route>
)

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

      <Page exact path='/collection' active='COLLECTION'>
        <Collection />
      </Page>
      <Page path='/collection/books' active='COLLECTION'>
        <BooksCalculator />
      </Page>
      <Page path='/collection/stats' active='COLLECTION'>
        <Stats />
      </Page>
      <Page path='/books' active='COLLECTION'>
        <Redirect to='/collection/books' />
      </Page>

      <Page path='/quest/:questId'>
        <QuestBuilderRoot />
      </Page>
      <Page path='/quest'>
        <QuestBuilderRoot />
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

      <Page path='/list/ranked' active='LIST_BUILDER'>
        <RankedList />
      </Page>
      <Page path='/list/equals' active='LIST_BUILDER'>
        <EqualsList />
      </Page>
      <Page path='/list/:listId/display' active='LIST_BUILDER'>
        <ListBuilderDisplayView />
      </Page>
      <Page path='/list/:listId' active='LIST_BUILDER'>
        <ListBuilderEditorView />
      </Page>
      <Page path='/list' active='LIST_BUILDER'>
        <ListBuilderEditorView />
      </Page>

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
