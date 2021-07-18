import React from 'react'
import CTA from '../CTA'
import Only from '../Only'
import { NotificationContext } from '../NotificationProvider'
import { PersonalDecksContext } from '../PersonalDecksProvider'
import download from '../../helpers/download'
import getFactionFromDeckID from '../../helpers/getFactionFromDeckID'

export default React.memo(function ExportDecks(props) {
  const { decks } = React.useContext(PersonalDecksContext)
  const { notify: sendNotification } = React.useContext(NotificationContext)

  const notify = React.useCallback(
    message => sendNotification({ icon: 'stack', children: message }),
    [sendNotification]
  )

  const formatDeckAsCSV = decks => {
    const headers = ['id', 'name', 'faction', 'tags']
    const data = [
      headers,
      ...decks.map(deck => [
        deck.id,
        deck.name,
        getFactionFromDeckID(deck.id),
        deck.tags.join(' '),
      ]),
    ].join('\n')

    return data
  }

  const exportDecks = () => {
    download({
      content: formatDeckAsCSV(decks),
      fileName: 'stormbound_decks.csv',
      mimeType: 'text/csv;encoding:utf-8',
    })
    notify('Your decks has been successfully exported.')
  }

  return (
    <CTA onClick={exportDecks} data-testid='export-decks-btn'>
      Export<Only.Desktop> decks</Only.Desktop>
    </CTA>
  )
})
