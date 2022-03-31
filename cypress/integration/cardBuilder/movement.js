import s from './selectors'

describe('Card Builder — Movement', () => {
  const movement = '2'
  const assertCardMovement = (index, value = movement, assertFixed = false) =>
    cy
      .get(s.CARD_PREVIEW)
      .eq(index)
      .find(s.CARD_MOVEMENT)
      .should('have.text', value)
      .then($node => {
        if (assertFixed)
          expect($node.attr('data-testid')).to.contain('card-movement-fixed')
      })

  before(() => {
    cy.visit('/card')
  })

  it('should be empty by default', () => {
    cy.get(s.MOVEMENT_INPUT).should('be.empty')
    cy.get(s.CARD_PREVIEW).eq(0).find(s.CARD_MOVEMENT).should('not.exist')
  })

  it('should be possible to define the card movement', () => {
    cy.get(s.MOVEMENT_INPUT).type(0).should('have.value', 0)
  })

  it('should be reflected in all preview', () => {
    for (let i = 0; i < 5; i++) assertCardMovement(i, 0)
  })

  it('should be possible to define fixed movement', () => {
    cy.get(s.MOVEMENT_INPUT)
      .clear()
      .type(movement)
      .should('have.value', movement)
    cy.get(s.FIXED_MOVEMENT_CHECKBOX).check().should('be.checked')
  })

  it('should be reflected in all preview', () => {
    for (let i = 0; i < 5; i++) assertCardMovement(i, movement, true)
  })

  it('should be preserved upon reload', () => {
    cy.url()
      .should('not.match', /\/card$/)
      .reload()
    cy.get(s.MOVEMENT_INPUT).should('have.value', movement)
    for (let i = 0; i < 5; i++) assertCardMovement(i, movement, true)
  })

  it('should be emptied if picking structure type', () => {
    cy.get(s.TYPE_SELECT).select('structure')
    cy.get(s.MOVEMENT_INPUT).should('be.empty').and('be.disabled')
    cy.get(s.FIXED_MOVEMENT_CHECKBOX)
      .should('not.be.checked')
      .and('be.disabled')
    cy.get(s.CARD_PREVIEW).eq(0).find(s.CARD_MOVEMENT).should('not.exist')
  })

  it('should be emptied if picking spell type', () => {
    cy.get(s.TYPE_SELECT).select('unit')
    cy.get(s.MOVEMENT_INPUT).type(movement).should('have.value', movement)
    cy.get(s.FIXED_MOVEMENT_CHECKBOX).check().should('be.checked')
    cy.get(s.TYPE_SELECT).select('spell')
    cy.get(s.MOVEMENT_INPUT).should('be.empty').and('be.disabled')
    cy.get(s.FIXED_MOVEMENT_CHECKBOX)
      .should('not.be.checked')
      .and('be.disabled')
    cy.get(s.CARD_PREVIEW).eq(0).find(s.CARD_MOVEMENT).should('not.exist')
  })
})
