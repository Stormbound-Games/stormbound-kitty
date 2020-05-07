import React from 'react'
import serialize from 'form-serialize'
import { PersonalDecksContext } from '../PersonalDecksProvider'
import { NotificationContext } from '../NotificationProvider'
import Column from '../Column'
import ExportDecks from '../ExportDecks'
import ImportDecks from '../ImportDecks'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Title from '../Title'
import YourDecks from '../YourDecks'
import './index.css'

const getFactionFromId = id => {
  if (id.includes('i')) return 'ironclad'
  if (id.includes('s')) return 'swarm'
  if (id.includes('f')) return 'shafowfen'
  if (id.includes('w')) return 'winter'
  return 'neutral'
}

const getDeckFromForm = form => {
  const formData = serialize(form, { hash: true })
  formData.id = formData.id.split('/').pop()
  formData.faction = getFactionFromId(formData.id)
  return formData
}

export default React.memo(function DeckBuilderYours(props) {
  const context = React.useContext(PersonalDecksContext)
  const [mode, setMode] = React.useState('GHOST')
  const [editedDeck, setEditedDeck] = React.useState(null)
  const { notify: sendNotification } = React.useContext(NotificationContext)

  const notify = React.useCallback(
    message => sendNotification({ icon: 'stack', children: message }),
    [sendNotification]
  )

  const disabledEditor = React.useCallback(() => {
    setMode('GHOST')
    setEditedDeck(null)
  }, [])

  React.useEffect(() => {
    const handleKeyDown = event => event.which === 27 && disabledEditor()

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [disabledEditor])

  // If the collection of decks is updated, it is as the result of an addition,
  // a removal or an edition, which means the editing mode can be cancelled.
  React.useEffect(disabledEditor, [context.decks])

  const addDeck = React.useCallback(
    event => {
      event.preventDefault()
      const formData = getDeckFromForm(event.target)
      const existingDeck = context.decks.find(deck => deck.id === formData.id)

      if (existingDeck) {
        notify(
          `This deck already exists in your collection as ‘${existingDeck.name}’.`
        )
      } else {
        context.addDeck(formData)
      }
    },
    [context, notify]
  )

  const editDeck = React.useCallback(
    event => {
      event.preventDefault()
      context.updateDeck(editedDeck, getDeckFromForm(event.target))
    },
    [context, editedDeck]
  )

  const enableEditor = React.useCallback(id => {
    setMode('EDITOR')
    setEditedDeck(id)
  }, [])

  return (
    <>
      <Row desktopOnly wideGutter>
        <Column width='1/3'>
          <Title>What is this</Title>
          <p>
            This is your own personal deck collection. You can add, update and
            remove decks at will to go beyond the 9-decks in-game limitation.
          </p>
          <p>
            Decks are locally saved in your browser, and you can also export
            (and import) them as CSV for syncing between devices or more
            permanent backup.
          </p>
          <div className='DeckBuilderYours__actions'>
            <Row>
              <Column>
                <ImportDecks />
              </Column>
              <Column>
                <ExportDecks />
              </Column>
            </Row>
          </div>
        </Column>
        <Column width='2/3'>
          <Title>Your decks</Title>
          <YourDecks
            onEdit={id => enableEditor(id)}
            disabledEditor={disabledEditor}
            editedDeck={editedDeck}
            editDeck={editDeck}
            mode={mode}
            setMode={setMode}
            addDeck={addDeck}
          />
        </Column>
      </Row>
      <PageMeta
        title='Your decks'
        description='Bookmark and manage your own deck, with a local backup and CSV import/export'
      />
    </>
  )
})
