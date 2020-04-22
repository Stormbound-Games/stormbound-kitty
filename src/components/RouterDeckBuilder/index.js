import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import load from '../../helpers/load'

const DeckBuilderSuggestions = load('DeckBuilderSuggestions')
const DeckBuilderRoot = load('DeckBuilderRoot')
const DeckBuilderDetailView = load('DeckBuilderDetailView')
const DeckBuilderDryRunView = load('DeckBuilderDryRunView')
const DeckBuilderTrackerView = load('DeckBuilderTrackerView')
const DeckBuilderEditorView = load('DeckBuilderEditorView')

const RouterDeckBuilder = ({ setActive }) => {
  const { path } = useRouteMatch()

  React.useEffect(() => setActive('DECK_BUILDER'), [setActive])

  return (
    <Switch>
      <Route path={`${path}/suggestions`}>
        <DeckBuilderSuggestions />
      </Route>
      <Route path={`${path}/:deckId/detail`}>
        <DeckBuilderRoot>
          {state => <DeckBuilderDetailView {...state} />}
        </DeckBuilderRoot>
      </Route>
      <Route path={`${path}/:deckId/dry-run`}>
        <DeckBuilderRoot>
          {state => <DeckBuilderDryRunView {...state} />}
        </DeckBuilderRoot>
      </Route>
      <Route path={`${path}/:deckId/tracker`}>
        <DeckBuilderRoot>
          {state => <DeckBuilderTrackerView {...state} />}
        </DeckBuilderRoot>
      </Route>
      <Route path={`${path}/:deckId`}>
        <DeckBuilderRoot>
          {state => <DeckBuilderEditorView {...state} />}
        </DeckBuilderRoot>
      </Route>
      <Route path={`${path}`}>
        <DeckBuilderRoot>
          {state => <DeckBuilderEditorView {...state} />}
        </DeckBuilderRoot>
      </Route>
    </Switch>
  )
}

export default RouterDeckBuilder
