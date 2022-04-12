import s from './selectors'

describe('Deck Builder - Personal decks', () => {
  before(() => cy.visit('/decks/bookmarks'))

  it('should display no deck and a ghost', () => {
    cy.get(s.PERSONAL_DECKS)
      .should('have.length', 0)

      .get(s.GHOST_DECK)
      .should('be.visible')
  })

  it('should be possible to add a deck', () => {
    cy.get(s.GHOST_DECK_BTN)
      .click()

      .get(s.DECK_FORM)
      .should('be.visible')

      .get(s.DECK_ID_INPUT)
      .type(
        'https://stormbound-kitty.com/deck/5n15n35n675n145n165w55w95w125w195n575w235n58',
        { delay: 0 }
      )

      .get(s.DECK_NAME_INPUT)
      .type('Test')

      .get(s.DECK_TAGS_INPUT)
      .type('High lev', { force: true })
      .type('{enter}')
      .type('Brawl', { force: true })
      .type('{enter}')

      .get(s.DECK_SUBMIT_BTN)
      .click()

      .get(s.DECK_FORM)
      .should('not.exist')

      .get(s.PERSONAL_DECKS)
      .should('have.length', 1)
  })

  it('should be possible to edit a deck', () => {
    cy.get(s.PERSONAL_DECKS)
      .first()

      .find(s.EDIT_DECK_BTN)
      .click()

      .get(s.DECK_FORM)
      .should('be.visible')

      .get(s.DECK_ID_INPUT)
      .clear()
      .type('5n15n35n675n145n165w55w95w125w195n575w235n57')

      .get(s.DECK_NAME_INPUT)
      .clear()
      .type('Renamed')

      .get(s.DECK_TAGS_INPUT)
      .type('{backspace}', { force: true })
      .blur()

      .get(s.DECK_SUBMIT_BTN)
      .click()

      .get(s.DECK_FORM)
      .should('not.exist')

      .get(s.PERSONAL_DECKS)
      .should('have.length', 1)

      .get(s.PERSONAL_DECKS)
      .first()
      .find('[data-testid="featured-deck-name"]')
      .should('contain', 'Renamed')
    cy.saveLocalStorage()
  })

  it('should be backed up in local storage and offer CSV export', () => {
    cy.restoreLocalStorage()
    cy.reload()
      .get(s.PERSONAL_DECKS)
      .should('have.length', 1)
      .get(s.EXPORT_DECKS_BTN)
      .exportFile()
      .should('contain', ',Renamed,')
  })

  it('should be possible to delete a deck', () => {
    cy.get(s.PERSONAL_DECKS)
      .first()
      .find(s.DELETE_DECK_BTN)
      .click()
      .get(s.DELETE_DECK_CONFIRM_BTN)
      .click()
      .get(s.PERSONAL_DECKS)
      .should('have.length', 0)
  })

  it('should be possible to import decks', () => {
    cy.get(s.IMPORT_DECKS_BTN)
      .importFile('decks.import.csv')
      .get(s.PERSONAL_DECKS)
      .should('have.length', 2)
  })

  it('should be possible to filter decks', () => {
    cy.reload()
      .get(s.PERSONAL_DECKS_NAME_INPUT)
      .should('not.exist')
      .get(s.PERSONAL_DECKS_FACTION_SELECT)
      .should('not.exist')
      .get(s.PERSONAL_DECKS_TAGS_SELECT)
      .should('not.exist')

      .get(s.IMPORT_DECKS_BTN)
      .importFile('decks.import.csv')

      .get(s.PERSONAL_DECKS_NAME_INPUT)
      .type('goat')

      .get(s.PERSONAL_DECKS)
      .should('have.length', 1)

      .get(s.PERSONAL_DECKS_NAME_INPUT)
      .clear()

      .get(s.PERSONAL_DECKS)
      .should('have.length', 2)

      .get(s.PERSONAL_DECKS_FACTION_SELECT)
      .select('winter')

      .get(s.PERSONAL_DECKS)
      .should('have.length', 1)

      .get(s.PERSONAL_DECKS_FACTION_SELECT)
      .select('*')

      .get(s.PERSONAL_DECKS)
      .should('have.length', 2)

      .get(s.PERSONAL_DECKS_TAGS_SELECT)
      .type('Brawl', { force: true })
      .type('{enter}')

      .get(s.PERSONAL_DECKS)
      .should('have.length', 1)
  })
})
