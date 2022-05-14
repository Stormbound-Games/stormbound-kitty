import s from './selectors'

describe('Cards Index — Navigation', () => {
  before(() => cy.visit('/cards/N89'))

  it('should be possible to search for an official card', () => {
    cy.get(s.CARD_SELECT).type('Green Pr{enter}', { force: true })
    cy.get(s.CARD_NAME).should('contain', 'Green Prototypes')
  })

  it('should display navigation buttons', () => {
    cy.get(s.PREV_BTN).click()
    cy.url().should('match', /\/cards\/N89/)
    cy.get(s.PREV_BTN).should('be.disabled')
    cy.get(s.NEXT_BTN).click()
    cy.url().should('match', /\/cards\/N1/)
  })
})
