import s from './selectors'

describe('Official card — Navigation', () => {
  before(() => cy.visit('/card/official/N89'))

  it('should be possible to search for an official card', () => {
    cy.get(s.CARD_SELECT)
      .find('input')
      .first()
      .type('Green Pr', { force: true })
      .type('{enter}', { force: true })
      .get(s.CARD_NAME)
      .should('contain', 'Green Prototypes')
  })

  it('should display navigation buttons', () => {
    cy.get(s.PREV_BTN)
      .click()

      .url()
      .should('match', /\/card\/official\/N89/)

      .get(s.PREV_BTN)
      .should('be.disabled')

      .get(s.NEXT_BTN)
      .click()

      .url()
      .should('match', /\/card\/official\/N1/)
  })

  it('should be possible to clear the current card', () => {
    cy.get(s.CARD_SELECT)
      .find('.CardSelect__clear-indicator')
      .click({ force: true })

      .url()
      .should('match', /\/card$/)

      .get(s.CARD_SELECT)
      .should('not.exist')
  })
})
