import React from 'react'
import loadable from '@loadable/component'
import { Switch, useRouteMatch } from 'react-router-dom'
import Loader from '../Loader'
import Page from '../Page'

const options = { fallback: <Loader /> }
const DeckBuilderSuggestions = loadable(
  () => import('../DeckBuilderSuggestions'),
  options
)

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
