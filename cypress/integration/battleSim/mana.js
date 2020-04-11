import s from './selectors'

describe('Battle Sim — Mana', () => {
  before(() => {
    cy.visit('/sim')
  })

  it('should be possible to update current mana', () => {
    cy.get(s.MANA_INPUT)
      // Cypress struggles calling `.clear()` on a `number` input
      // See: https://github.com/cypress-io/cypress/issues/2650
      .focus()
      .type('{selectall}9')
      .get(s.MANA)
      .eq(0)
      .should('have.text', '9')
      .get(s.MANA)
      .eq(1)
      .should('have.text', '9')
  })

  it('should be preserved upon reload', () => {
    cy.reload().get(s.MANA).eq(0).should('have.text', '9')
  })
})
