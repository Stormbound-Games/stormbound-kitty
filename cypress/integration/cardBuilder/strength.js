import s from './selectors'

const assertCardStrength = (index, strength) =>
  cy
    .get(s.CARD_PREVIEW)
    .eq(index)
    .find(s.CARD_STRENGTH)
    .should('have.text', strength)

describe('Card Builder — Strength', () => {
  before(() => {
    cy.visit('/card')
  })

  it('should be empty by default', () => {
    cy.get(s.STRENGTH_INPUT).should('be.empty')
  })

  it('should be possible to define the card strength', () => {
    cy.get(s.STRENGTH_INPUT).type('5').should('have.value', '5')
    assertCardStrength(0, '5')
  })

  it('should be preserved upon reload', () => {
    cy.url()
      .should('not.match', /\/card$/)
      .reload()
    cy.get(s.STRENGTH_INPUT).should('have.value', '5')
    assertCardStrength(0, '5')
  })

  it('should be possible to define it per level', () => {
    cy.get(s.STRENGTH_INPUT)
      .clear()
      .type('1/2/3/4/5')
      .should('have.value', '1/2/3/4/5')
    assertCardStrength(0, '1')
    assertCardStrength(1, '2')
    assertCardStrength(2, '3')
    assertCardStrength(3, '4')
    assertCardStrength(4, '5')
  })

  it('should be emptied if picking spell type', () => {
    cy.get(s.TYPE_SELECT).select('spell')
    cy.get(s.MOVEMENT_INPUT).should('be.empty').and('be.disabled')
    cy.get(s.CARD_PREVIEW).eq(0).find(s.CARD_STRENGTH).should('not.exist')
  })
})
