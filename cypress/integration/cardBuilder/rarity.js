import s from './selectors'

const assertCardRarity = (index, rarity) =>
  cy
    .get(s.CARD_PREVIEW)
    .eq(index)
    .find(s.CARD_RARITY)
    .should('have.attr', 'alt', rarity)

describe('Card Builder — Rarity', () => {
  before(() => {
    cy.visit('/card')
  })

  it('should be common by default', () => {
    cy.get(s.RARITY_SELECT).should('have.value', 'common')
  })

  it('should be possible to define the card rarity', () => {
    cy.get(s.RARITY_SELECT)
      .should('be.visible')
      .select('epic')
      .should('have.value', 'epic')
    assertCardRarity(0, 'epic')
  })

  it('should be preserved upon reload', () => {
    cy.url()
      .should('not.match', /\/card$/)
      .reload()
    cy.get(s.RARITY_SELECT).should('have.value', 'epic')
    assertCardRarity(0, 'epic')
  })
})
