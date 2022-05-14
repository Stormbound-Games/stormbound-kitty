import s from './selectors'

describe('Deck Builder - Bookmarks', () => {
  before(() =>
    cy.clearLocalStorageSnapshot().visit('/decks/bookmarks').wait(2000)
  )
  beforeEach(() => cy.restoreLocalStorage())
  afterEach(() => cy.saveLocalStorage())

  it('should be possible to add a deck', () => {
    const url =
      'https://stormbound-kitty.com/deck/5n15n35n675n145n165w55w95w125w195n575w235n58'

    cy.get(s.PERSONAL_DECKS).should('have.length', 0)
    cy.get(s.GHOST_DECK).should('be.visible')
    cy.get(s.GHOST_DECK_BTN).should('be.visible').click()
    cy.get(s.DECK_FORM).should('be.visible')
    cy.get(s.DECK_ID_INPUT).type(url, { delay: 0 })
    cy.get(s.DECK_NAME_INPUT).type('Test')
    cy.get(s.DECK_TAGS_INPUT).type('High lev{enter}Brawl{enter}', {
      force: true,
    })
    cy.get(s.DECK_SUBMIT_BTN).click()
    cy.get(s.DECK_FORM).should('not.exist')
    cy.get(s.PERSONAL_DECKS).should('have.length', 1)
  })

  it('should be possible to edit a deck', () => {
    cy.get(s.PERSONAL_DECKS).first().find(s.EDIT_DECK_BTN).click()
    cy.get(s.DECK_FORM).should('be.visible')
    cy.get(s.DECK_ID_INPUT)
      .clear()
      .type('5n15n35n675n145n165w55w95w125w195n575w235n57')
    cy.get(s.DECK_NAME_INPUT).clear().type('Renamed')
    cy.get(s.DECK_TAGS_INPUT).type('{backspace}', { force: true }).blur()
    cy.get(s.DECK_SUBMIT_BTN).click()
    cy.get(s.DECK_FORM).should('not.exist')
    cy.get(s.PERSONAL_DECKS).should('have.length', 1)
    cy.get(s.PERSONAL_DECKS)
      .first()
      .find('[data-testid="featured-deck-name"]')
      .should('contain', 'Renamed')
  })

  it('should be backed up in local storage and offer CSV export', () => {
    cy.reload()
    cy.get(s.PERSONAL_DECKS).should('have.length', 1)
    cy.get(s.EXPORT_DECKS_BTN).exportFile().should('contain', ',Renamed,')
  })

  it('should be possible to delete a deck', () => {
    cy.get(s.PERSONAL_DECKS).first().find(s.DELETE_DECK_BTN).click()
    cy.get(s.DELETE_DECK_CONFIRM_BTN).click()
    cy.get(s.PERSONAL_DECKS).should('have.length', 0)
  })

  it('should be possible to import decks', () => {
    cy.get(s.IMPORT_DECKS_BTN).importFile('decks.import.csv')
    cy.get(s.PERSONAL_DECKS).should('have.length', 2)
  })

  it('should be possible to filter decks', () => {
    cy.get(s.PERSONAL_DECKS_NAME_INPUT).type('goat')
    cy.get(s.PERSONAL_DECKS).should('have.length', 1)
    cy.get(s.PERSONAL_DECKS_NAME_INPUT).clear()
    cy.get(s.PERSONAL_DECKS).should('have.length', 2)
    cy.get(s.PERSONAL_DECKS_FACTION_SELECT).select('winter')
    cy.get(s.PERSONAL_DECKS).should('have.length', 1)
    cy.get(s.PERSONAL_DECKS_FACTION_SELECT).select('*')
    cy.get(s.PERSONAL_DECKS).should('have.length', 2)
    cy.get(s.PERSONAL_DECKS_TAGS_SELECT).type('Brawl{enter}', { force: true })
    cy.get(s.PERSONAL_DECKS).should('have.length', 1)
  })
})
