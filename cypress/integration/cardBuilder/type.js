import s from './selectors'

describe('Card Builder — Type', () => {
  const type = 'spell'
  const assertCardType = index =>
    cy
      .get(s.CARD_PREVIEW)
      .eq(index)
      .find('[data-testid="card"]')
      .should('have.attr', 'data-type', type)

  before(() => {
    cy.visit('/card')
  })

  it('should be unit by default', () => {
    cy.get(s.TYPE_SELECT).should('have.value', 'unit')
  })

  it('should be possible to update the card faction', () => {
    cy.get(s.TYPE_SELECT).select(type).should('have.value', type)
  })

  it('should be reflected in all preview', () => {
    for (let i = 0; i < 5; i++) assertCardType(i)
  })

  it('should be preserved upon reload', () => {
    cy.wait(1000).reload()
    cy.get(s.TYPE_SELECT).should('have.value', type)
    for (let i = 0; i < 5; i++) assertCardType(i)
  })

  it('should be possible to prefill it from the URL', () => {
    cy.visit('/card?type=' + type)
    cy.get(s.TYPE_SELECT).should('have.value', type)
    for (let i = 0; i < 5; i++) assertCardType(i)
  })
})
