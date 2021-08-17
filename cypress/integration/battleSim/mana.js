import s from './selectors'

describe('Battle Sim — Mana', () => {
  before(() => {
    cy.visit('/sim')
  })

  it('should be possible to update current mana', () => {
    cy.get(s.MANA_INPUT)
      .clear()
      .type('9')
      .get(s.MANA)
      .eq(0)
      .should('have.text', '9')
      .get(s.MANA)
      .eq(1)
      .should('have.text', '9')
  })

  it('should be preserved upon reload', () => {
    cy.wait(1000).reload().get(s.MANA).eq(0).should('have.text', '9')
  })
})
