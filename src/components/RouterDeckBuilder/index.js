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

export default function RouterDeckBuilder() {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Page
        path={`${path}/suggestions`}
        active={['DECK_BUILDER', 'SUGGESTIONS']}
      >
        <DeckBuilderSuggestions />
      </Page>
      <Page path={`${path}/:deckId/detail`} active={['DECK_BUILDER', 'DETAIL']}>
        <DeckBuilderRoot>
          {state => <DeckBuilderDetailView {...state} />}
        </DeckBuilderRoot>
      </Page>
      <Page
        path={`${path}/:deckId/dry-run`}
        active={['DECK_BUILDER', 'DRY_RUN']}
      >
        <DeckBuilderRoot>
          {state => <DeckBuilderDryRunView {...state} />}
        </DeckBuilderRoot>
      </Page>
      <Page path={`${path}/:deckId`} active={['DECK_BUILDER', 'EDITOR']}>
        <DeckBuilderRoot>
          {state => <DeckBuilderEditorView {...state} />}
        </DeckBuilderRoot>
      </Page>
      <Page path={path} active={['DECK_BUILDER', 'EDITOR']}>
        <DeckBuilderRoot>
          {state => <DeckBuilderEditorView {...state} />}
        </DeckBuilderRoot>
      </Page>
    </Switch>
  )
}
