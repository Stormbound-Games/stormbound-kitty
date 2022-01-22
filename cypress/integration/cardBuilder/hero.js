import s from './selectors'

describe('Card Builder — Hero', () => {
  const assertCardHero = index =>
    cy.get(s.CARD_PREVIEW).eq(index).find(s.CARD_RACE).should('contain', 'hero')

  before(() => {
    cy.visit('/card')
  })

  it('should be unchecked by default', () => {
    cy.get(s.HERO_CHECKBOX).should('not.be.checked')
  })

  it('should be possible to define a card as Hero', () => {
    cy.get(s.HERO_CHECKBOX).check().should('be.checked')
  })

  it('should be reflected in all preview', () => {
    for (let i = 0; i < 5; i++) assertCardHero(i)
  })

  it('should be preserved upon reload', () => {
    cy.url()
      .should('not.match', /\/card$/)
      .reload()
    cy.get(s.HERO_CHECKBOX).should('be.checked')
    for (let i = 0; i < 5; i++) assertCardHero(i)
  })

  it('should be unchecked if picking structure type', () => {
    cy.get(s.TYPE_SELECT).select('structure')
    cy.get(s.HERO_CHECKBOX).should('not.be.checked').and('be.disabled')
    cy.get(s.CARD_PREVIEW).eq(0).find(s.CARD_RACE).should('not.contain', 'hero')
  })

  it('should be unchecked if picking spell type', () => {
    cy.get(s.TYPE_SELECT).select('unit')
    cy.get(s.HERO_CHECKBOX).check()
    cy.get(s.TYPE_SELECT).select('spell')
    cy.get(s.HERO_CHECKBOX).should('not.be.checked').and('be.disabled')
    cy.get(s.CARD_PREVIEW).eq(0).find(s.CARD_RACE).should('not.contain', 'hero')
  })
})
