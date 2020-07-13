import React from 'react'
import serialize from 'form-serialize'
import { PersonalDecksContext } from '../PersonalDecksProvider'
import { NotificationContext } from '../NotificationProvider'
import { CATEGORIES } from '../../constants/decks'
import Column from '../Column'
import ExportDecks from '../ExportDecks'
import ImportDecks from '../ImportDecks'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Title from '../Title'
import YourDecks from '../YourDecks'
import YourDecksFilters from '../YourDecksFilters'
import './index.css'

const getFactionFromId = id => {
  if (id.includes('i')) return 'ironclad'
  if (id.includes('s')) return 'swarm'
  if (id.includes('f')) return 'shadowfen'
  if (id.includes('w')) return 'winter'
  return 'neutral'
}

const getDeckFromForm = form => {
  const formData = serialize(form, { hash: true })
  formData.id = formData.id.split('/').pop()
  formData.faction = getFactionFromId(formData.id)
  return formData
}

export default React.memo(function DeckCollection(props) {
  const context = React.useContext(PersonalDecksContext)
  const { toggleUnseen } = context
  const [mode, setMode] = React.useState('INITIAL')
  const [editedDeck, setEditedDeck] = React.useState(null)
  const [filters, setFilters] = React.useState({
    name: '',
    faction: '*',
    category: '*',
    order: 'DATE',
  })
  const { notify: sendNotification } = React.useContext(NotificationContext)
  const displayedDecks = context.decks
    .filter(deck => {
      if (
        filters.name &&
        !deck.name.toLowerCase().includes(filters.name.toLowerCase())
      )
        return false
      if (filters.faction !== '*' && deck.faction !== filters.faction)
        return false
      if (
        filters.category !== '*' &&
        deck.category !== filters.category &&
        // Look up for existing categories as well, as the label is used to
        // avoid rendering all uppercase categories.
        CATEGORIES[deck.category] !== filters.category
      )
        return false
      return true
    })
    .slice(0)
    .sort((a, b) => {
      if (filters.order === 'FACTION') {
        if (a.faction > b.faction) return +1
        if (a.faction < b.faction) return -1
      } else if (filters.order === 'CATEGORY') {
        if (a.category > b.category) return +1
        if (a.category < b.category) return -1
      } else if (filters.order === 'NAME') {
        if (a.name < b.name) return -1
        if (a.name > b.name) return +1
      }

      return 0
    })

  const notify = React.useCallback(
    message => sendNotification({ icon: 'stack', children: message }),
    [sendNotification]
  )

  const disabledEditor = React.useCallback(() => {
    setMode('INITIAL')
    setEditedDeck(null)
  }, [])

  const enableEditor = React.useCallback(id => {
    setMode('EDITOR')
    setEditedDeck(id)
  }, [])

  React.useEffect(() => {
    const handleKeyDown = event => event.which === 27 && disabledEditor()

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [disabledEditor])

  React.useEffect(() => toggleUnseen(false), [toggleUnseen])

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

          <YourDecksFilters {...filters} setFilters={setFilters} />

          <div className='DeckCollection__actions'>
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
            decks={displayedDecks}
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
