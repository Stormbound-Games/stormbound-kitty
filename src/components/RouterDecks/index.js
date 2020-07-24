import React from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'
import Page from '../Page'
import load from '../../helpers/load'

const DeckSuggestions = load('DeckSuggestions')
const DeckBuilderRoot = load('DeckBuilderRoot')
const DeckDetailView = load('DeckDetailView')
const DeckDryRunView = load('DeckDryRunView')
const DeckEditorView = load('DeckEditorView')
const DeckCollection = load('DeckCollection')

export default function RouterDecks() {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Page path={`${path}/suggestions`} active={['DECKS', 'SUGGESTIONS']}>
        <DeckSuggestions />
      </Page>
      <Page path={`${path}/collection`} active={['DECKS', 'COLLECTION']}>
        <DeckCollection />
      </Page>

      <Page path={`${path}/:deckId/detail`} active={['DECKS', 'DETAIL']}>
        <DeckBuilderRoot view='DETAIL'>
          {state => <DeckDetailView {...state} />}
        </DeckBuilderRoot>
      </Page>
      <Page path={`${path}/:deckId/dry-run`} active={['DECKS', 'DRY_RUN']}>
        <DeckBuilderRoot view='DRY_RUN'>
          {state => <DeckDryRunView {...state} />}
        </DeckBuilderRoot>
      </Page>
      <Page path={`${path}/:deckId`} active={['DECKS', 'EDITOR']}>
        <DeckBuilderRoot view='EDITOR'>
          {state => <DeckEditorView {...state} />}
        </DeckBuilderRoot>
      </Page>
      <Page path={path} active={['DECKS', 'EDITOR']}>
        <DeckBuilderRoot view='EDITOR'>
          {state => <DeckEditorView {...state} />}
        </DeckBuilderRoot>
      </Page>
    </Switch>
  )
}
