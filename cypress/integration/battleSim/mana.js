import s from './selectors'

describe('Battle Sim — Mana', () => {
  before(() => {
    cy.visit('/sim')
  })

  it('should be possible to update current mana', () => {
    cy.get(s.MANA_INPUT)
      .clear()
      .type('20')
      .get(s.MANA)
      .eq(0)
      .then($mana => expect($mana).to.have.text('20'))
      .get(s.MANA)
      .eq(1)
      .then($mana => expect($mana).to.have.text('20'))
  })

  it('should be preserved upon reload', () => {
    cy.reload()
      .get(s.MANA)
      .eq(0)
      .then($mana => expect($mana).to.have.text('20'))
  })
})
