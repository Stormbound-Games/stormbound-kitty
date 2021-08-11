import s from './selectors'

describe('Card Builder — Faction', () => {
  const faction = 'ironclad'
  const assertCardFaction = index =>
    cy
      .get(s.CARD_PREVIEW)
      .eq(index)
      .find('[data-testid="card"]')
      .should('have.attr', 'data-faction', faction)

  before(() => {
    cy.visit('/card')
  })

  it('should be neutral by default', () => {
    cy.get(s.FACTION_SELECT).should('have.value', 'neutral')
  })

  it('should be possible to update the card faction', () => {
    cy.get(s.FACTION_SELECT).select(faction).should('have.value', faction)
  })

  it('should be reflected in all preview', () => {
    for (let i = 0; i < 5; i++) assertCardFaction(i)
  })

  it('should be preserved upon reload', () => {
    cy.reload()
    cy.get(s.FACTION_SELECT).should('have.value', faction)
    for (let i = 0; i < 5; i++) assertCardFaction(i)
  })

  it('should be possible to prefill it from the URL', () => {
    cy.visit('/card?faction=' + faction)
    cy.get(s.FACTION_SELECT).should('have.value', faction)
    for (let i = 0; i < 5; i++) assertCardFaction(i)
  })
})
