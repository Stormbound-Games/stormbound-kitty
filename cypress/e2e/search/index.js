import s from './selectors'

describe('Search', () => {
  it('should be possible to do a search', () => {
    cy.visit('/')
    cy.get(s.SEARCH_BUTTON).last().click()
    cy.get(s.SEARCH_DIALOG).should('be.visible')
    cy.get(s.SEARCH_INPUT).type('kitt')
    cy.url().as('url')
    cy.get(s.SEARCH_RESULT).first().find('a').click()
    cy.get('@url').then(url => cy.url().should('not.equal', url))
  })
})
