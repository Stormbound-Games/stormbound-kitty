import s from './selectors'

describe('Card Builder — Movement', () => {
  const movement = '2'
  const assertCardMovement = (index, value = movement) =>
    cy
      .get(s.CARD_PREVIEW)
      .eq(index)
      .find(s.CARD_MOVEMENT)
      .should('have.text', value)

  before(() => {
    cy.visit('/card')
  })

  it('should be empty by default', () => {
    cy.get(s.MOVEMENT_INPUT).should('be.empty')
    cy.get(s.CARD_PREVIEW).eq(0).find(s.CARD_MOVEMENT).should('not.exist')
  })

  it('should be possible to define the card movement', () => {
    cy.get(s.MOVEMENT_INPUT).type(movement).should('have.value', movement)
  })

  it('should be reflected in all preview', () => {
    for (let i = 0; i < 5; i++) assertCardMovement(i)
  })

  it('should be preserved upon reload', () => {
    cy.reload()
    cy.get(s.MOVEMENT_INPUT).should('have.value', movement)
    for (let i = 0; i < 5; i++) assertCardMovement(i)
  })

  it('should be emptied if picking structure type', () => {
    cy.get(s.TYPE_SELECT).select('structure')
    cy.get(s.MOVEMENT_INPUT).should('be.empty').and('be.disabled')
    cy.get(s.CARD_PREVIEW).eq(0).find(s.CARD_MOVEMENT).should('not.exist')
  })

  it('should be emptied if picking spell type', () => {
    cy.get(s.TYPE_SELECT).select('unit')
    cy.get(s.MOVEMENT_INPUT).type(movement).should('have.value', movement)
    cy.get(s.TYPE_SELECT).select('spell')
    cy.get(s.MOVEMENT_INPUT).should('be.empty').and('be.disabled')
    cy.get(s.CARD_PREVIEW).eq(0).find(s.CARD_MOVEMENT).should('not.exist')
  })

  it('should be possible to prefill it from the URL', () => {
    cy.visit('/card?movement=0')
    cy.get(s.MOVEMENT_INPUT).should('have.value', '0')
    for (let i = 0; i < 5; i++) assertCardMovement(i, '0')
  })
})
