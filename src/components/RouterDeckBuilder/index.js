import React from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'
import Page from '../Page'
import load from '../../helpers/load'

const DeckBuilderSuggestions = load('DeckBuilderSuggestions')
const DeckBuilderRoot = load('DeckBuilderRoot')
const DeckBuilderDetailView = load('DeckBuilderDetailView')
const DeckBuilderDryRunView = load('DeckBuilderDryRunView')
const DeckBuilderTrackerView = load('DeckBuilderTrackerView')
const DeckBuilderEditorView = load('DeckBuilderEditorView')

const RouterDeckBuilder = props => {
  const { path } = useRouteMatch()
  const active = 'DECK_BUILDER'

  return (
    <Switch>
      <Page path={`${path}/suggestions`} active={active}>
        <DeckBuilderSuggestions />
      </Page>
      <Page path={`${path}/:deckId/detail`} active={active}>
        <DeckBuilderRoot>
          {state => <DeckBuilderDetailView {...state} />}
        </DeckBuilderRoot>
      </Page>
      <Page path={`${path}/:deckId/dry-run`} active={active}>
        <DeckBuilderRoot>
          {state => <DeckBuilderDryRunView {...state} />}
        </DeckBuilderRoot>
      </Page>
      <Page path={`${path}/:deckId/tracker`} active={active}>
        <DeckBuilderRoot>
          {state => <DeckBuilderTrackerView {...state} />}
        </DeckBuilderRoot>
      </Page>
      <Page path={`${path}/:deckId`} active={active}>
        <DeckBuilderRoot>
          {state => <DeckBuilderEditorView {...state} />}
        </DeckBuilderRoot>
      </Page>
      <Page path={`${path}`} active={active}>
        <DeckBuilderRoot>
          {state => <DeckBuilderEditorView {...state} />}
        </DeckBuilderRoot>
      </Page>
    </Switch>
  )
}

export default RouterDeckBuilder
