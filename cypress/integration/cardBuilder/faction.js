import s from './selectors'

const assertCardFaction = (index, faction) =>
  cy
    .get(s.CARD_PREVIEW)
    .eq(index)
    .find('[data-testid="card"]')
    .should('have.attr', 'data-faction', faction)

describe('Card Builder — Faction', () => {
  before(() => {
    cy.visit('/card')
  })

  it('should be neutral by default', () => {
    cy.get(s.FACTION_SELECT).should('have.value', 'neutral')
  })

  it('should be possible to update the card faction', () => {
    cy.get(s.FACTION_SELECT).select('ironclad').should('have.value', 'ironclad')
    assertCardFaction(0, 'ironclad')
  })

  it('should be preserved upon reload', () => {
    cy.url()
      .should('not.match', /\/card$/)
      .reload()
    cy.get(s.FACTION_SELECT).should('have.value', 'ironclad')
    assertCardFaction(0, 'ironclad')
  })
})
