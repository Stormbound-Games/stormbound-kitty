import React from 'react'
import serialize from 'form-serialize'
import Page from '~/components/Page'
import { PersonalDecksContext } from '~/components/PersonalDecksProvider'
import { NotificationContext } from '~/components/NotificationProvider'
import ExportDecks from '~/components/ExportDecks'
import ImportDecks from '~/components/ImportDecks'
import Row from '~/components/Row'
import Spacing from '~/components/Spacing'
import Title from '~/components/Title'
import YourDecks from '~/components/YourDecks'
import YourDecksFilters from '~/components/YourDecksFilters'
import getDeckIDFromURL from '~/helpers/getDeckIDFromURL'
import getFactionFromDeckID from '~/helpers/getFactionFromDeckID'
import indexArray from '~/helpers/indexArray'

const toArray = value => (Array.isArray(value) ? value : [value])

const getDeckFromForm = (availableTags, form) => {
  const tagsIndex = indexArray(availableTags, 'slug')
  const formData = serialize(form, { hash: true })
  formData.id = getDeckIDFromURL(formData.id)
  formData.faction = getFactionFromDeckID(formData.id)
  formData.tags = toArray(formData['deck-tags'])
    .filter(slug => slug in tagsIndex)
    .map(slug => ({ name: tagsIndex[slug].name, slug: tagsIndex[slug].slug }))

  return formData
}

export default React.memo(function DeckCollection(props) {
  const context = React.useContext(PersonalDecksContext)
  const { toggleUnseen } = context
  const [mode, setMode] = React.useState('INITIAL')
  const [editedDeckUUID, setEditedDeckUUID] = React.useState(null)
  const [filters, setFilters] = React.useState({
    name: '',
    faction: '*',
    tags: [],
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
      if (
        filters.faction !== '*' &&
        getFactionFromDeckID(deck.id) !== filters.faction
      )
        return false
      if (
        !filters.tags.every(tag => deck.tags.map(tag => tag.slug).includes(tag))
      )
        return false
      return true
    })
    .slice(0)
    .sort((a, b) => {
      if (filters.order === 'FACTION') {
        if (getFactionFromDeckID(a.id) > getFactionFromDeckID(b.id)) return +1
        if (getFactionFromDeckID(a.id) < getFactionFromDeckID(b.id)) return -1
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
    setEditedDeckUUID(null)
  }, [])

  const enableEditor = React.useCallback(uuid => {
    setMode('EDITOR')
    setEditedDeckUUID(uuid)
  }, [])

  React.useEffect(() => {
    const handleKeyDown = event => event.which === 27 && disabledEditor()

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [disabledEditor])

  React.useEffect(() => toggleUnseen(false), [toggleUnseen])

  // If the collection of decks is updated, it is as the result of an addition,
  // a removal or an edition, which means the editing mode can be cancelled.
  React.useEffect(disabledEditor, [context.decks, disabledEditor])

  const addDeck = React.useCallback(
    event => {
      event.preventDefault()
      const formData = getDeckFromForm(props.availableTags, event.target)
      // This check is effectively performed on the deck ID and not the UUID
      // because this is about telling the user they have already recorded that
      // deck and therefore it is not going to be added again.
      const existingDeck = context.decks.find(deck => deck.id === formData.id)

      if (existingDeck) {
        notify(
          `This deck already exists in your collection as ‘${existingDeck.name}’.`
        )
      } else {
        context.addDeck(formData)
      }
    },
    [context, notify, props.availableTags]
  )

  const editDeck = React.useCallback(
    event => {
      event.preventDefault()
      context.updateDeck(
        editedDeckUUID,
        getDeckFromForm(props.availableTags, event.target)
      )
    },
    [context, editedDeckUUID, props.availableTags]
  )

  return (
    <Page
      title='Personal Decks'
      description='Bookmark and manage your own deck, with a local backup and CSV import/export'
      meta={
        context.decks.length === 1 ? '1 deck' : `${context.decks.length} decks`
      }
      action={{
        to: '/deck/featured',
        children: 'Featured Decks',
        icon: 'arrow-right',
      }}
    >
      <Row isDesktopOnly>
        <Row.Column width='1/3'>
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

          <YourDecksFilters
            {...filters}
            setFilters={setFilters}
            availableTags={props.availableTags}
          />

          <Spacing top='BASE'>
            <Row withNarrowGutter>
              <Row.Column>
                <ImportDecks />
              </Row.Column>
              <Row.Column>
                <ExportDecks />
              </Row.Column>
            </Row>
          </Spacing>
        </Row.Column>

        <Row.Column width='2/3'>
          <Title>Your decks</Title>
          <YourDecks
            decks={displayedDecks}
            onEdit={uuid => enableEditor(uuid)}
            disabledEditor={disabledEditor}
            editedDeckUUID={editedDeckUUID}
            editDeck={editDeck}
            mode={mode}
            setMode={setMode}
            addDeck={addDeck}
            availableTags={props.availableTags}
          />
        </Row.Column>
      </Row>
    </Page>
  )
})
