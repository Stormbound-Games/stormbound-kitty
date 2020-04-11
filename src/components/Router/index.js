import React from 'react'
import loadable from '@loadable/component'
import { Router, Redirect } from '@reach/router'
import Loader from '../Loader'

const Page = loadable(props => import(`../${props.Component}`), {
  fallback: <Loader />,
})

const AppRouter = props => (
  <Router primary={false}>
    <Page Component='Home' path='/' />
    <Page Component='FAQ' path='/faq' />

    <Page Component='BSRoot' path='/sim' />
    <Page Component='BSPuzzles' path='/sim/puzzles' />
    <Page Component='BSRoot' path='/sim/:simId' />
    <Page Component='BSDisplay' path='/sim/:simId/display' />

    <Page Component='CBRoot' path='/card' />
    <Page Component='CBContest' path='/card/contest' />
    <Page Component='CBRoot' path='/card/:cardId' />
    <Page Component='CBDisplay' path='/card/:cardId/display' />

    <Page Component='DBRoot' path='/deck'>
      <Page Component='DBEditorView' path='/' />
    </Page>
    <Page Component='DBSuggestions' path='/deck/suggestions' />
    <Page Component='DBCollection' path='/deck/collection' />

    <Redirect noThrow from='/deck/:deckId/stats' to='/deck/:deckId/detail' />
    <Page Component='DBRoot' path='/deck/:deckId'>
      <Page Component='DBEditorView' path='/' />
      <Page Component='DBDetailView' path='/detail' />
      <Page Component='DBDryRunView' path='/dry-run' />
      <Page Component='DBTrackerView' path='/tracker' />
    </Page>

    <Page Component='QBRoot' path='/quest' />
    <Page Component='QBRoot' path='/quest/:questId' />

    <Page Component='Stories' path='/stories' />
    <Page
      Component='StoriesCategory'
      path='/stories/neutral'
      category='neutral'
    />
    <Page
      Component='StoriesCategory'
      path='/stories/ironclad'
      category='ironclad'
    />
    <Page
      Component='StoriesCategory'
      path='/stories/winter'
      category='winter'
    />
    <Page
      Component='StoriesCategory'
      path='/stories/shadowfen'
      category='shadowfen'
    />
    <Page Component='StoriesCategory' path='/stories/swarm' category='swarm' />
    <Page Component='StoriesCategory' path='/stories/lore' category='lore' />
    <Page Component='Story' path='/stories/:storyId' />

    <Page Component='Guides' path='/guides' />
    <Page Component='CompleteGuide' path='/guides/complete' />
    <Page Component='DeckGuide' path='/guides/deck' />
    <Page Component='WinterGuide' path='/guides/winter' />
    <Page Component='PirateGuide' path='/guides/pirate' />
    <Page Component='Lexicon' path='/guides/lexicon' />
    <Redirect noThrow from='/deck/guide' to='/guides/deck' />

    <Page Component='TLBEditorView' path='/list' />
    <Page Component='TLBEditorView' path='/list/:listId' />
    <Page Component='TLBDisplayView' path='/list/:listId/display' />
  </Router>
)

export default AppRouter
