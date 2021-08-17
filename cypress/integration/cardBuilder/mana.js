import s from './selectors'

describe('Card Builder — Mana', () => {
  const mana = '5'
  const assertCardMana = (index, value = mana) =>
    cy
      .get(s.CARD_PREVIEW)
      .eq(index)
      .find(s.CARD_MANA)
      .should('have.text', value)

  before(() => {
    cy.visit('/card')
  })

  it('should be empty by default', () => {
    cy.get(s.MANA_INPUT).should('be.empty')
    for (let i = 0; i < 5; i++) assertCardMana(i, '')
  })

  it('should be possible to define the card mana', () => {
    cy.get(s.MANA_INPUT).type(mana).should('have.value', mana)
  })

  it('should be reflected in all preview', () => {
    for (let i = 0; i < 5; i++) assertCardMana(i)
  })

  it('should be preserved upon reload', () => {
    cy.wait(1000).reload()
    cy.get(s.MANA_INPUT).should('have.value', mana)
    for (let i = 0; i < 5; i++) assertCardMana(i)
  })

  it('should be possible to define it per level', () => {
    cy.get(s.MANA_INPUT)
      .clear()
      .type('1/2/3/4/5')
      .should('have.value', '1/2/3/4/5')
    assertCardMana(0, '1')
    assertCardMana(1, '2')
    assertCardMana(2, '3')
    assertCardMana(3, '4')
    assertCardMana(4, '5')
  })

  it('should be possible to prefill it from the URL', () => {
    cy.visit('/card?mana=1/2/3/4/5')
    assertCardMana(0, '1')
    assertCardMana(1, '2')
    assertCardMana(2, '3')
    assertCardMana(3, '4')
    assertCardMana(4, '5')
    cy.get(s.MANA_INPUT).should('have.value', '1/2/3/4/5')
  })
})
