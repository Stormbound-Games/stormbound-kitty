import React from 'react'
import DeckEditorView from '~/components/DeckEditorView'
import DeckDetailView from '~/components/DeckDetailView'
import DeckDryRunView from '~/components/DeckDryRunView'
import useDeckBuilder from '~/hooks/useDeckBuilder'

const COMPONENTS = {
  DRY_RUN: DeckDryRunView,
  DETAIL: DeckDetailView,
  EDITOR: DeckEditorView,
}

export default React.memo(function PageDeckBuilder(props) {
  const state = useDeckBuilder(props)
  const View = COMPONENTS[props.view]

  return <View {...state} brawls={props.brawls} />
})
