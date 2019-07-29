import React from 'react'
import { Router, Redirect } from '@reach/router'
import Home from '../Home'
import FAQ from '../FAQ'
import CardBuilder from '../CBRoot'
import CardContest from '../CBContest'
import CardDisplay from '../CBDisplay'
import DeckBuilder from '../DBRoot'
import QuestBuilder from '../QBRoot'
import Puzzles from '../BSPuzzles'
import BattleSim from '../BSRoot'
import BattleDisplay from '../BSDisplay'
import Editor from '../DBEditorView'
import Collection from '../DBCollection'
import DeckGuide from '../DeckGuide'
import CompleteGuide from '../CompleteGuide'
import WinterGuide from '../WinterGuide'
import PirateGuide from '../PirateGuide'
import Guides from '../Guides'
import Suggestions from '../DBSuggestions'
import Detail from '../DBDetailView'
import DryRun from '../DBDryRunView'
import Lexicon from '../Lexicon'
import Stories from '../Stories'
import Story from '../Story'
import TierList from '../TLBEditorView'
import TierDisplay from '../TLBDisplayView'

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
    </DeckBuilder>

    <QuestBuilder path="/quest" />
    <QuestBuilder path="/quest/:questId" />

    <Stories path="/stories" />
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
