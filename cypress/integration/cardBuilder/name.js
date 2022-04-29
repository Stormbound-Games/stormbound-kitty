import s from './selectors'

const assertCardName = (index, name) =>
  cy.get(s.CARD_PREVIEW).eq(index).find(s.CARD_NAME).should('have.text', name)

describe('Card Builder — Name', () => {
  before(() => {
    cy.visit('/card')
  })

  it('should be empty by default', () => {
    cy.get(s.NAME_INPUT).should('be.empty')
  })

  it('should be possible to define the card name', () => {
    cy.get(s.NAME_INPUT)
      .type('Kitty Sparkles')
      .should('have.value', 'Kitty Sparkles')
    assertCardName(0, 'Kitty Sparkles')
  })

  it('should be preserved upon reload', () => {
    cy.url()
      .should('not.match', /\/card$/)
      .reload()
    cy.get(s.NAME_INPUT).should('have.value', 'Kitty Sparkles')
    assertCardName(0, 'Kitty Sparkles')
  })
})
