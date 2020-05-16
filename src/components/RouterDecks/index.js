import React from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'
import Page from '../Page'
import PersonalDecksProvider from '../PersonalDecksProvider'
import load from '../../helpers/load'

const DeckBuilderSuggestions = load('DeckBuilderSuggestions')
const DeckBuilderRoot = load('DeckBuilderRoot')
const DeckBuilderDetailView = load('DeckBuilderDetailView')
const DeckBuilderDryRunView = load('DeckBuilderDryRunView')
const DeckBuilderEditorView = load('DeckBuilderEditorView')
const DeckBuilderYourDecks = load('DeckBuilderYourDecks')

export default function RouterDecks() {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Page path={`${path}/suggestions`} active={['DECKS', 'SUGGESTIONS']}>
        <PersonalDecksProvider>
          <DeckBuilderSuggestions />
        </PersonalDecksProvider>
      </Page>
      <Page path={`${path}/yours`} active={['DECKS', 'YOURS']}>
        <PersonalDecksProvider>
          <DeckBuilderYourDecks />
        </PersonalDecksProvider>
      </Page>
      <Page path={`${path}/:deckId/detail`} active={['DECKS', 'DETAIL']}>
        <DeckBuilderRoot>
          {state => <DeckBuilderDetailView {...state} />}
        </DeckBuilderRoot>
      </Page>
      <Page path={`${path}/:deckId/dry-run`} active={['DECKS', 'DRY_RUN']}>
        <DeckBuilderRoot>
          {state => <DeckBuilderDryRunView {...state} />}
        </DeckBuilderRoot>
      </Page>
      <Page path={`${path}/:deckId`} active={['DECKS', 'EDITOR']}>
        <DeckBuilderRoot>
          {state => <DeckBuilderEditorView {...state} />}
        </DeckBuilderRoot>
      </Page>
      <Page path={path} active={['DECKS', 'EDITOR']}>
        <DeckBuilderRoot>
          {state => <DeckBuilderEditorView {...state} />}
        </DeckBuilderRoot>
      </Page>
    </Switch>
  )
}
