import s from './selectors'

describe('Fan-kit — Card Search', () => {
  before(() => cy.visit('/fan-kit/cards'))

  it('should be possible to search for cards', function () {
    cy.get(s.ITEMS)
      .its('length')
      // Cypress 12 shenanigans 🙃
      // Ref: https://docs.cypress.io/guides/references/migration-guide#Behavior-Changes-in-Alias-Resolution
      .then(value => value)
      .as('count')
    cy.get(s.IMAGE_INPUT).type('Gift{enter}', { force: true })
    cy.get('@count').then(count => {
      cy.get(s.ITEMS).its('length').should('not.eq', count)
    })
  })
})
