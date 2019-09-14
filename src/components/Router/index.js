import React from 'react'
import Loadable from 'react-loadable'
import { Router, Redirect } from '@reach/router'
import PageLoading from '../PageLoading'

const Home = Loadable({
  loader: () => import('../Home' /* webpackChunkName: "Home" */),
  loading: PageLoading
})
const FAQ = Loadable({
  loader: () => import('../FAQ' /* webpackChunkName: "FAQ" */),
  loading: PageLoading
})
const CardBuilder = Loadable({
  loader: () => import('../CBRoot' /* webpackChunkName: "CBRoot" */),
  loading: PageLoading
})
const CardContest = Loadable({
  loader: () => import('../CBContest' /* webpackChunkName: "CBContest" */),
  loading: PageLoading
})
const CardDisplay = Loadable({
  loader: () => import('../CBDisplay' /* webpackChunkName: "CBDisplay" */),
  loading: PageLoading
})
const DeckBuilder = Loadable({
  loader: () => import('../DBRoot' /* webpackChunkName: "DBRoot" */),
  loading: PageLoading
})
const QuestBuilder = Loadable({
  loader: () => import('../QBRoot' /* webpackChunkName: "QBRoot" */),
  loading: PageLoading
})
const Puzzles = Loadable({
  loader: () => import('../BSPuzzles' /* webpackChunkName: "BSPuzzles" */),
  loading: PageLoading
})
const BattleSim = Loadable({
  loader: () => import('../BSRoot' /* webpackChunkName: "BSRoot" */),
  loading: PageLoading
})
const BattleDisplay = Loadable({
  loader: () => import('../BSDisplay' /* webpackChunkName: "BSDisplay" */),
  loading: PageLoading
})
const Editor = Loadable({
  loader: () =>
    import('../DBEditorView' /* webpackChunkName: "DBEditorView" */),
  loading: PageLoading
})
const Collection = Loadable({
  loader: () =>
    import('../DBCollection' /* webpackChunkName: "DBCollection" */),
  loading: PageLoading
})
const DeckGuide = Loadable({
  loader: () => import('../DeckGuide' /* webpackChunkName: "DeckGuide" */),
  loading: PageLoading
})
const CompleteGuide = Loadable({
  loader: () =>
    import('../CompleteGuide' /* webpackChunkName: "CompleteGuide" */),
  loading: PageLoading
})
const WinterGuide = Loadable({
  loader: () => import('../WinterGuide' /* webpackChunkName: "WinterGuide" */),
  loading: PageLoading
})
const PirateGuide = Loadable({
  loader: () => import('../PirateGuide' /* webpackChunkName: "PirateGuide" */),
  loading: PageLoading
})
const Guides = Loadable({
  loader: () => import('../Guides' /* webpackChunkName: "Guides" */),
  loading: PageLoading
})
const Suggestions = Loadable({
  loader: () =>
    import('../DBSuggestions' /* webpackChunkName: "DBSuggestions" */),
  loading: PageLoading
})
const Detail = Loadable({
  loader: () =>
    import('../DBDetailView' /* webpackChunkName: "DBDetailView" */),
  loading: PageLoading
})
const DryRun = Loadable({
  loader: () =>
    import('../DBDryRunView' /* webpackChunkName: "DBDryRunView" */),
  loading: PageLoading
})
const Tracker = Loadable({
  loader: () =>
    import('../DBTrackerView' /* webpackChunkName: "DBTrackerView" */),
  loading: PageLoading
})
const Lexicon = Loadable({
  loader: () => import('../Lexicon' /* webpackChunkName: "Lexicon" */),
  loading: PageLoading
})
const Stories = Loadable({
  loader: () => import('../Stories' /* webpackChunkName: "Stories" */),
  loading: PageLoading
})
const StoriesCategory = Loadable({
  loader: () =>
    import('../StoriesCategory' /* webpackChunkName: "StoriesCategory" */),
  loading: PageLoading
})
const Story = Loadable({
  loader: () => import('../Story' /* webpackChunkName: "Story" */),
  loading: PageLoading
})
const TierList = Loadable({
  loader: () =>
    import('../TLBEditorView' /* webpackChunkName: "TLBEditorView" */),
  loading: PageLoading
})
const TierDisplay = Loadable({
  loader: () =>
    import('../TLBDisplayView' /* webpackChunkName: "TLBDisplayView" */),
  loading: PageLoading
})

const AppRouter = props => (
  <Router primary={false}>
    <Home path="/" />
    <FAQ path="/faq" />

    <BattleSim path="/sim" />
    <Puzzles path="/sim/puzzles" />
    <BattleSim path="/sim/:simId" />
    <BattleDisplay path="/sim/:simId/display" />

    <CardBuilder path="/card" />
    <CardContest path="/card/contest" />
    <CardBuilder path="/card/:cardId" />
    <CardDisplay path="/card/:cardId/display" />

    <DeckBuilder path="/deck">
      <Editor path="/" />
    </DeckBuilder>
    <Suggestions path="/deck/suggestions" />
    <Collection path="/deck/collection" />

    <Redirect noThrow from="/deck/:deckId/stats" to="/deck/:deckId/detail" />
    <DeckBuilder path="/deck/:deckId">
      <Editor path="/" />
      <Detail path="/detail" />
      <DryRun path="/dry-run" />
      <Tracker path="/tracker" />
    </DeckBuilder>

    <QuestBuilder path="/quest" />
    <QuestBuilder path="/quest/:questId" />

    <Stories path="/stories" />
    <StoriesCategory path="/stories/neutral" category="neutral" />
    <StoriesCategory path="/stories/ironclad" category="ironclad" />
    <StoriesCategory path="/stories/winter" category="winter" />
    <StoriesCategory path="/stories/shadowfen" category="shadowfen" />
    <StoriesCategory path="/stories/swarm" category="swarm" />
    <StoriesCategory path="/stories/lore" category="lore" />
    <Story path="/stories/:storyId" />

    <Guides path="/guides" />
    <CompleteGuide path="/guides/complete" />
    <DeckGuide path="/guides/deck" />
    <WinterGuide path="/guides/winter" />
    <PirateGuide path="/guides/pirate" />
    <Lexicon path="/guides/lexicon" />
    <Redirect noThrow from="/deck/guide" to="/guides/deck" />

    <TierList path="/list" />
    <TierList path="/list/:listId" />
    <TierDisplay path="/list/:listId/display" />
  </Router>
)

export default AppRouter
