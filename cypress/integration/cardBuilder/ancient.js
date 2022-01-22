import s from './selectors'

describe('Card Builder — Hero', () => {
  const assertCardAncient = index =>
    cy
      .get(s.CARD_PREVIEW)
      .eq(index)
      .find(s.CARD_RACE)
      .should('contain', 'ancient')

  before(() => {
    cy.visit('/card')
  })

  it('should be unchecked by default', () => {
    cy.get(s.ANCIENT_CHECKBOX).should('not.be.checked')
  })

  it('should be possible to define a card as Ancient', () => {
    cy.get(s.ANCIENT_CHECKBOX).check().should('be.checked')
  })

  it('should be reflected in all preview', () => {
    for (let i = 0; i < 5; i++) assertCardAncient(i)
  })

  it('should be preserved upon reload', () => {
    cy.url()
      .should('not.match', /\/card$/)
      .reload()
    cy.get(s.ANCIENT_CHECKBOX).should('be.checked')
    for (let i = 0; i < 5; i++) assertCardAncient(i)
  })

  it('should be available if picking structure type', () => {
    cy.get(s.TYPE_SELECT).select('structure')
    cy.get(s.ANCIENT_CHECKBOX).should('be.checked').and('not.be.disabled')
    cy.get(s.CARD_PREVIEW).eq(0).find(s.CARD_RACE).should('contain', 'ancient')
  })

  it('should be available if picking spell type', () => {
    cy.get(s.TYPE_SELECT).select('spell')
    cy.get(s.ANCIENT_CHECKBOX).should('be.checked').and('not.be.disabled')
    cy.get(s.CARD_PREVIEW).eq(0).find(s.CARD_RACE).should('contain', 'ancient')
  })
})
