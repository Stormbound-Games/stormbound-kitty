import s from './selectors'

describe('Search', () => {
  it('should be possible to do a search', () => {
    cy.visit('/')
    cy.get(s.SEARCH_BUTTON).click().get(s.SEARCH_DIALOG).should('be.visible')
    cy.get(s.SEARCH_INPUT).type('card').type('{enter}')
    cy.get(s.SEARCH_RESULT).first().click()
    cy.url().should('not.be', '/')
  })
})
