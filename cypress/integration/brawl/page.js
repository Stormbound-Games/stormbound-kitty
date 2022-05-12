import s from './selectors'

describe('Brawl — Page', () => {
  before(() => {
    cy.clearLocalStorageSnapshot()
  })

  beforeEach(() => {
    cy.restoreLocalStorage()
    cy.visit('/brawl/construct-movement')
  })

  afterEach(() => {
    cy.saveLocalStorage()
  })

  it('should display only relevant content when no matches are recorded', () => {
    cy.get(s.RESET_BTN).should('not.exist')
    cy.get(s.MILESTONE).first().should('be.visible')
  })

  it('should be possible to record a match', () => {
    cy.brAddMatch('WON', 20, 'ironclad', 'FORTRESS_LEVEL')
    cy.get(s.MATCHES).should('have.length', 1)
  })

  it('should be possible to edit a match', () => {
    cy.get(s.MATCHES).first().find(s.MATCH_EDIT_BTN).click()
    cy.get(s.OPPONENT_FACTION_SELECT).select('')
    cy.get(s.OPPONENT_HEALTH_INPUT).clear()
    cy.get(s.BONUS_SELECT).select('RUSTY_SLOT')
    cy.get(s.MATCH_SUBMIT_BTN).click()
    cy.get(s.MATCHES).should('have.length', 1)
  })

  it('should display relevant data when there is at least a match', () => {
    cy.get(s.RESET_BTN).should('exist')
  })

  it('should mark previous milestones as collected', () => {
    cy.brAddMatch('WON')
    cy.get(s.MILESTONE).first().should('have.attr', 'data-collected', 'true')
  })

  it('should be backed up in local storage and offer CSV export', () => {
    cy.reload()
    cy.get(s.MATCHES).should('have.length', 2)
    cy.get(s.EXPORT_BTN).exportFile().should('contain', '0NW')
  })

  it('should be possible to import brawl data', () => {
    cy.get(s.IMPORT_BTN).importFile('brawl.import.csv')
    cy.get(s.MATCHES).should('have.length', 5)
  })

  it('should be possible to reset brawl data', () => {
    cy.get(s.RESET_BTN).click()
    cy.get(s.RESET_CONFIRM_BTN).click()
    cy.get(s.MATCHES).should('have.length', 0)
  })
})
