import s from './selectors'

describe('Card Builder — Name', () => {
  const name = 'Kitty Sparkles'
  const assertCardName = index =>
    cy.get(s.CARD_PREVIEW).eq(index).find(s.CARD_NAME).should('have.text', name)

  before(() => {
    cy.visit('/card')
  })

  it('should be empty by default', () => {
    cy.get(s.NAME_INPUT).should('be.empty')
  })

  it('should be possible to define the card name', () => {
    cy.get(s.NAME_INPUT).type(name).should('have.value', name)
  })

  it('should be reflected in all preview', () => {
    for (let i = 0; i < 5; i++) assertCardName(i)
  })

  it('should be preserved upon reload', () => {
    cy.reload()
    cy.get(s.NAME_INPUT).should('have.value', name)
    for (let i = 0; i < 5; i++) assertCardName(i)
  })

  it('should be possible to prefill it from the URL', () => {
    cy.visit('/card?name=' + encodeURIComponent(name))
      .get(s.NAME_INPUT)
      .should('have.value', name)
    for (let i = 0; i < 5; i++) assertCardName(i)
  })
})
