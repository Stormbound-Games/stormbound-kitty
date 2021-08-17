import s from './selectors'

describe('Card Builder — Rarity', () => {
  const rarity = 'epic'
  const assertCardRarity = index =>
    cy
      .get(s.CARD_PREVIEW)
      .eq(index)
      .find(s.CARD_RARITY)
      .should('have.attr', 'alt', rarity)

  before(() => {
    cy.visit('/card')
  })

  it('should be common by default', () => {
    cy.get(s.RARITY_SELECT).should('have.value', 'common')
  })

  it('should be possible to define the card rarity', () => {
    cy.get(s.RARITY_SELECT).select(rarity).should('have.value', rarity)
  })

  it('should be reflected in all preview', () => {
    for (let i = 0; i < 5; i++) assertCardRarity(i)
  })

  it('should be preserved upon reload', () => {
    cy.wait(1000).reload()
    cy.get(s.RARITY_SELECT).should('have.value', rarity)
    for (let i = 0; i < 5; i++) assertCardRarity(i)
  })

  it('should be possible to prefill it from the URL', () => {
    cy.visit('/card?rarity=' + rarity)
    cy.get(s.RARITY_SELECT).should('have.value', rarity)
    for (let i = 0; i < 5; i++) assertCardRarity(i)
  })
})
