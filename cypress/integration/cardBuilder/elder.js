import s from './selectors'

describe('Card Builder — Elder', () => {
  const assertCardElder = index =>
    cy
      .get(s.CARD_PREVIEW)
      .eq(index)
      .find(s.CARD_RACE)
      .should('contain', 'elder')

  before(() => {
    cy.visit('/card')
  })

  it('should be unchecked by default', () => {
    cy.get(s.ELDER_CHECKBOX).should('not.be.checked')
  })

  it('should be possible to define a card as Elder', () => {
    cy.get(s.ELDER_CHECKBOX).check().should('be.checked')
  })

  it('should be reflected in all preview', () => {
    for (let i = 0; i < 5; i++) assertCardElder(i)
  })

  it('should be preserved upon reload', () => {
    cy.url()
      .should('not.match', /\/card$/)
      .reload()
    cy.get(s.ELDER_CHECKBOX).should('be.checked')
    for (let i = 0; i < 5; i++) assertCardElder(i)
  })

  it('should be unchecked if picking structure type', () => {
    cy.get(s.TYPE_SELECT).select('structure')
    cy.get(s.ELDER_CHECKBOX).should('not.be.checked').and('be.disabled')
    cy.get(s.CARD_PREVIEW)
      .eq(0)
      .find(s.CARD_RACE)
      .should('not.contain', 'elder')
  })

  it('should be unchecked if picking spell type', () => {
    cy.get(s.TYPE_SELECT).select('unit')
    cy.get(s.ELDER_CHECKBOX).check()
    cy.get(s.TYPE_SELECT).select('spell')
    cy.get(s.ELDER_CHECKBOX).should('not.be.checked').and('be.disabled')
    cy.get(s.CARD_PREVIEW)
      .eq(0)
      .find(s.CARD_RACE)
      .should('not.contain', 'elder')
  })
})
